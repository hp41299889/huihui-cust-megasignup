import axios, { AxiosInstance } from "axios";

const request = (baseURL = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });
  //   instance.interceptors.request.use((config) => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   });

  //   instance.interceptors.response.use(
  //     (r) => {
  //       return r;
  //     },
  //     (e) => {
  //       if (
  //         e.response &&
  //         (e.response.status === 401 || e.response.status === 403)
  //       ) {
  //         window.location.href = "/";
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //         localStorage.removeItem("userId");
  //       }
  //       return Promise.reject(e);
  //     }
  //   );
  return instance;
};

export const nextApi = request(`${process.env.NEXT_PUBLIC_API_URL}/api`);
