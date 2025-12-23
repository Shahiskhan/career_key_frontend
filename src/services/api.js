import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1', // Adjusted based on prompt "local host 9090/api/v1/auth"
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Token Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        // The backend handles refresh via HttpOnly cookie by default, 
        // but we might need to call /auth/refresh explicitly
        const response = await axios.post('http://localhost:9090/api/v1/auth/refresh', {}, {
          withCredentials: true // Important to send/receive cookies
        });

        const { accessToken } = response.data;
        sessionStorage.setItem('accessToken', accessToken);

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        sessionStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
