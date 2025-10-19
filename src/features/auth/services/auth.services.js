import Api from '../../../app/services/api'
import Config from '../../../app/config/config'

const baseURL = "/auth";
export const AuthServices = {
  login: (data) => {
    data.grant_type = Config.grant_type;
    data.client_id = Config.client_id;
    data.client_secret = Config.client_secret;
    return Api.post(`${baseURL}/login`, data);
  },
  register: (data) => {
    return Api.post(`${baseURL}/register`, data);
  },
  logout: (data) => {
    return Api.post(`${baseURL}/logout`, data);
  },
  me: () => {
    return Api.get(`${baseURL}/me`);
  },
};
