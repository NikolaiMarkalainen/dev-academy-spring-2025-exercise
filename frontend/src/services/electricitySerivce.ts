import axios from "axios";

const api = import.meta.env.VITE_API_URL;
export const getPaginatedDailyValues = async () => {
  const urlParams = new URLSearchParams(document.location.search);
  const result = await axios.get(`${api}/api/FilterElectricity`, {params: urlParams})
  return result.data;
};

export const getSingleDayData = async (date: string) => {
  const result = await axios.get(`${api}/api/DailyElectricity`, {params: {date: date}});
  return result;
};
