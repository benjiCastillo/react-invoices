import Api from "../../../app/services/api";
import { clearObj } from "../../../app/utils/clearObj";

const baseURL = "/sales";

export const OrdersServices = {
  getComandas: (query) => {
    return Api.get(`${baseURL}/list-pos2`, { params: clearObj(query) });
  },
  getTotals: (query) => {
    return Api.get(`${baseURL}/totals-pos`, { params: clearObj(query) });
  },
};
