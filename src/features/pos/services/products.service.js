import Api from "../../../app/services/api";
import { clearObj } from "../../../app/utils/clearObj";

const baseURL = "/products";
export const ProductsServices = {
  indexPOS: (query) => {
    return Api.get(`${baseURL}/index-pos`, { params: clearObj(query) });
  },
};
