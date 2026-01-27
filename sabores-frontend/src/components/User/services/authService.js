import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const authService = {
  // Configuração do axios
  axiosInstance: axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),

  // Interceptor para adicionar token
  setupInterceptors: (store) => {
    authService.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para refresh token
    authService.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post(`${API_URL}/users/refresh-token`, {
              refreshToken,
            });
            
            const { token } = response.data;
            localStorage.setItem('token', token);
            
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return authService.axiosInstance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  },

  // Métodos da API
  login: async (email, password) => {
    return authService.axiosInstance.post('/users/login', {
      email,
      password,
    });
  },

  register: async (userData) => {
    return authService.axiosInstance.post('/users/register', userData);
  },

  verifyToken: async (token) => {
    const response = await authService.axiosInstance.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    return authService.axiosInstance.post('/users/forgot-password', { email });
  },

  resetPassword: async (token, password) => {
    return authService.axiosInstance.post(`/users/reset-password/${token}`, {
      password,
    });
  },

  verifyEmail: async (token) => {
    return authService.axiosInstance.post(`/users/verify-email/${token}`);
  },

  // Atualizar perfil
  updateProfile: async (userData) => {
    return authService.axiosInstance.put('/users/profile', userData);
  },

  // Mudar senha
  changePassword: async (currentPassword, newPassword) => {
    return authService.axiosInstance.put('/users/profile/password', {
      currentPassword,
      newPassword,
    });
  },
};

export default authService;