import axios from "axios";

// helper
import { successAlert } from "../successAlert";
import { errorAlert } from "../errorAlert";

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
      successAlert();
      return res;
    },
    async (err) => {
      errorAlert();
      throw err;
    }
  );
  return axiosInstance;
};
