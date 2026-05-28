import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🌐 Production Live Database Endpoints
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://mobisplit-backend-production.up.railway.app';

console.log(`📡 MobiSplit Network Core mapped to engine: ${BASE_URL}`);

// =========================================================
// 🚀 OPTIMIZED AXIOS INSTANCE ENGINE
// =========================================================
export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000, // 15 seconds ensures cell signals don't drop out during high-volume queries
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// 🔒 SECURITY INTERCEPTOR: Automatically inject User JWT Tokens into Headers
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('🔑 Storage interceptor token lookup failure:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =========================================================
// 🔄 REAL-TIME SOCKET TRANSCEIVER SYSTEM (TYPED & CLEANED)
// =========================================================
// Explicitly type the socket reference instance to prevent implicit "any" leaks
let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
    if (!socketInstance) {
        // NOTE: Removed pingTimeout and pingInterval as they are backend server configurations only.
        socketInstance = io(BASE_URL, {
            autoConnect: false,
            forceNew: true,
        });

        // Core Debug Status Listeners
        socketInstance.on('connect', () => {
            console.log(`✅ Real-time Socket handshake complete: ${socketInstance?.id}`);
        });

        socketInstance.on('disconnect', (reason: string) => {
            console.log(`❌ Socket connection severed. Reason: ${reason}`);
        });

        socketInstance.on('connect_error', (error: Error) => {
            console.error('🚨 Live Socket transmission failure:', error.message);
        });
    }
    return socketInstance;
};

// =========================================================
// 📦 MODULAR CONTROLLER ENDPOINTS UTILITIES (TYPED)
// =========================================================
export const authAPI = {
    login: (credentials: any) => api.post('/api/auth/login', credentials),
    register: (userData: any) => api.post('/api/auth/register', userData),
    validateToken: () => api.get('/api/auth/validate-token'),
    forgotPassword: (email: string) => api.post('/api/auth/forgot-password', { email }),
};

export const profileAPI = {
    getProfile: (userId: any) => api.get(`/api/profile/${userId}`),
    updateProfile: (formData: any) => api.post('/api/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // Tailored structure for image binaries
    }),
};

export const rideAPI = {
    requestRide: (rideData: any) => api.post('/api/rides/request', rideData),
};