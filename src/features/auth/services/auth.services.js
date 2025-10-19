import Api from '../../../app/services/api'
import Config from '../../../app/config/config'

const baseURL = "/auth";
export const AuthServices = {
  login: (data) => {
    data.grant_type = Config.grant_type;
    data.client_id = Config.client_id;
    data.client_secret = Config.client_secret;
    // data.username = "gerente";
    // data.password = ">09+p[+!8:4C";
    // data.company_nit_document = "5653651017" // 196192021 5653651017
    return Api.post(`${baseURL}/login`, data);
  },
  register: (data) => {
    return Api.post(`${baseURL}/register`, data);
  },
  logout: () => {
    return Api.post(`${baseURL}/logout`);
  },
  me: () => {
    return Api.get(`${baseURL}/me`);
  },
};
