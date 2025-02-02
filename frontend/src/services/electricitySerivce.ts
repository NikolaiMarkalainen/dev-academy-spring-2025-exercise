import axios from "axios";
import { IPaginatedRequst } from "../types/IPaginatedRequest";

const api = import.meta.env.VITE_API_URL;
export const getPaginatedDailyValues = async (request: IPaginatedRequst) => {
  const result = await axios.post(`${api}/api/FilterElectricity`, request);
  return result;
};
