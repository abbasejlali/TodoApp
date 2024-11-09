import axios from "axios";

export const callapi = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      throw err;
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      throw err;
    }
  );
  return axiosInstance;
};
