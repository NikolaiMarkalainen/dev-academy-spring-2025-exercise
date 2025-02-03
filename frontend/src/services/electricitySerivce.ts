import axios from "axios";
import { IPaginatedRequst } from "../types/IPaginatedRequest";

const api = import.meta.env.VITE_API_URL;
export const getPaginatedDailyValues = async (request: IPaginatedRequst) => {
  const result = await axios.post(`${api}/api/FilterElectricity`, request);
  return result;
};

export const getSingleDayData = async (date: string) => {
  const result = await axios.get(`${api}/api/DailyElectricity?date=${date}`);
  return result;
};
