const axios = require("axios").default;
const BASE_URL: string = process.env.ENVIRONMENT === "production" ? "https://api.artesaniasbogota.shop:3200/api" : "http://localhost:3200/api";
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
