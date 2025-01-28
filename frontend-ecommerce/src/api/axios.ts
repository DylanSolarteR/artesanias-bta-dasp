const axios = require("axios").default;
type ENVIROMENTS = "development" | "production";
const ENVIROMENT: ENVIROMENTS = "development";
const BASE_URL: string = ENVIROMENT === "development" ? "http://localhost:3200/api" : "https://api.artesaniasbogota.shop:3200/api";
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
