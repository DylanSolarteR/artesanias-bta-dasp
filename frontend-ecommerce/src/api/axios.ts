const axios = require("axios").default;
const BASE_URL: string = "https://api.artesaniasbogota.shop:3200/api"
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
