import Api from "../../../app/services/api";
import { clearObj } from "../../../app/utils/clearObj";
const baseURL = "/dispatch-points";
export const DispatchPointsServices = {
  getDispatchPoints: (query) => {
    return Api.get(`${baseURL}`, { params: clearObj(query) });
  },
};
