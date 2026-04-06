import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: JWT 토큰 주입 (authStore 연동 전 - 임시)
apiClient.interceptors.request.use(
  (config) => {
    // const token = authStore.token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 공통 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized 처리 등
    return Promise.reject(error);
  }
);

export default apiClient;
