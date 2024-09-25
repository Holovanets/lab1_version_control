import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useAuth } from '@/context'; // Импортируйте ваш AuthContext
import { ApiConstants } from '@/constants';

const useAuthInterceptor = () => {
  const { authToken, refreshAuthToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`
          config.headers['Access-Control-Allow-Origin'] = '*'
          config.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, PATCH, HEAD, OPTIONS'
          config.headers['Access-Control-Allow-Headers'] = '*'
          config.headers.Accept = 'application/json'
          config.headers['Content-Type'] = 'application/json'
  
          // Другие заголовки...
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const refreshTokenURL = `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.AUTH}${ApiConstants.BACKEND_API.TOKENS}/refresh`
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 423 && !originalRequest._retry && originalRequest.url !== refreshTokenURL) {
          originalRequest._retry = true;
          const newAuthToken = await refreshAuthToken();
          if (newAuthToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAuthToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
    
    
    

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken, refreshAuthToken]);

  // Другой код...
};

export default useAuthInterceptor;
