const axios = require("axios").default;
export const AxiosInstance = axios.create({
  baseURL: "http://localhost:3200/api/",
});
