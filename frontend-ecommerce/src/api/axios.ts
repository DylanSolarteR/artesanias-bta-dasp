const axios = require("axios").default;
export const AxiosInstance = axios.create({
  baseURL: "https://api.artesaniasbogota.shop:3200/api",
});
