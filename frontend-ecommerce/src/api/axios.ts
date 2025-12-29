const axios = require("axios").default;
const BASE_URL: string = "https://artesanias-bta-dasp-s1gs.onrender.com/api";
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
