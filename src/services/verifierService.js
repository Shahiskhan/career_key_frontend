import api from './api';

const verifierService = {
  verifyDegreeRequestById: async (degreeRequestId) => {
    try {
      const response = await api.post(`/verifier/degree-requests/${degreeRequestId}/verify`);
      return response.data;
    } catch (error) {
      console.error('Error verifying degree request:', error);
      throw error;
    }
  }
};

export default verifierService;
