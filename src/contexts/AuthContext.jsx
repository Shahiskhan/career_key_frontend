import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const normalizeUser = (userData) => {
        if (!userData) return null;

        // Backend uses 'role' (singular) as per record UserDto { Set<Role> role }
        const rawRoles = userData.role || userData.roles || [];

        const roles = (Array.isArray(rawRoles) ? rawRoles : [rawRoles]).map(r => {
            let roleName = "";
            if (typeof r === 'string') {
                roleName = r;
            } else if (r && typeof r === 'object') {
                // Handle complex role objects common in Spring Security
                roleName = r.name || r.authority || r.roleName || "";
            }

            // Standardize to ROLE_ prefix if missing (matches ProtectedRoute requirements)
            if (roleName && !roleName.startsWith('ROLE_')) {
                return `ROLE_${roleName.toUpperCase()}`;
            }
            return roleName.toUpperCase();
        }).filter(Boolean);

        return {
            ...userData,
            roles,
            enabled: userData.enable ?? userData.enabled // Map 'enable' from backend record
        };
    };



    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('accessToken');
            if (token) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(normalizeUser(userData));
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    sessionStorage.removeItem('accessToken');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const data = await authService.login(credentials);
            const userToSet = normalizeUser(data.user || data);
            setUser(userToSet);
            setIsAuthenticated(true);
            return { ...data, user: userToSet };
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };


    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const registerStudent = async (data) => {
        return await authService.registerStudent(data);
    };

    const registerUniversity = async (data) => {
        return await authService.registerUniversity(data);
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        registerStudent,
        registerUniversity
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
