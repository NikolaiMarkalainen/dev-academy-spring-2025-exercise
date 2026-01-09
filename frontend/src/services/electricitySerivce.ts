import axios from "axios";
import { IPaginatedRequst } from "../types/IPaginatedRequest";

const api = import.meta.env.VITE_API_URL;
export const getPaginatedDailyValues = async (query: IPaginatedRequst) => {
  const result = await axios.get(`${api}/api/FilterElectricity`, {
    params: {
      query
    }
  })
  return result;
};

export const getSingleDayData = async (date: string) => {
  const result = await axios.get(`${api}/api/DailyElectricity?date=${date}`);
  return result;
};
