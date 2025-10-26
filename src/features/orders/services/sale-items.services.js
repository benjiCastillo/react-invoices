import Api from "../../../app/services/api";
import { clearObj } from "../../../app/utils/clearObj";

const baseURL = "/sale-items";

export const SaleItemsServices = {
  edit: async (id, data) => {
    return Api.put(`${baseURL}/${id}`, clearObj(data));
  },
  bulkUpdateDeliveryStatus: async (data) => {
    return Api.put(`${baseURL}/bulk-update-delivery-status`, clearObj(data));
  },
};
