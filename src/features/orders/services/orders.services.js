import Api from "../../../app/services/api";
const baseURL = "/sales";
export const OrdersServices = {
  getComandas: (query) => {
    return Api.get(`${baseURL}/list-pos2`, { params: query });
  },
};
