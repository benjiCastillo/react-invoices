import axios from "axios";
import Config from "../config/config";
import { useAuthStore } from "../store/UseAuthStore";

const Api = axios.create({
  baseURL: Config.api_url,
});

Api.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = Config.authorization_token;
    config.headers["Authorization"] = `Bearer ${
      useAuthStore.getState().access_token
    }`;
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default Api;
