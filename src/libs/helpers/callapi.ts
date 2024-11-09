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
      const res = err.response;
      if (res.status === 400) {
        throw console.log(res);
      }
      if (res.status === 404) {
        throw console.log(res);
      }
      if (res.status === 406) {
        throw console.log(res);
      }

      throw err;
    }
  );
  return axiosInstance;
};
