import Api from '../../../app/services/api'

const baseURL = "/auth";
export const AuthServices = {
  login: (data) => {
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
