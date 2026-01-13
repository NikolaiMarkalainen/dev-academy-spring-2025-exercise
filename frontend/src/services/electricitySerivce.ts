import axios from "axios";
import { IPaginatedData, IPaginatedResult, ISingleDateObject } from "../types/types";

const api = import.meta.env.VITE_API_URL;
export const getPaginatedDailyValues = async (): Promise<IPaginatedResult<IPaginatedData>> => {
  const urlParams = new URLSearchParams(document.location.search);
  const result = await axios.get(`${api}/api/FilterElectricity`, {params: urlParams})
  return result.data;
};

export const getSingleDayData = async (date: string): Promise<IPaginatedResult<ISingleDateObject[]>> => {
  const result = await axios.get(`${api}/api/DailyElectricity`, {params: {date: date}});
  return result.data;
};
