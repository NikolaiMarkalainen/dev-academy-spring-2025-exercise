import { useEffect, useState } from "react";
import { ISingleDateObject } from "../types/ISingleDateObject";
import { getSingleDayData } from "../services/electricitySerivce";

export const useSinglePageView = (date: string) => {
  const [dayData, setDayData] = useState<ISingleDateObject[]>([
    {
      id: 1,
      date: new Date(Date.now()),
      startTime: new Date(Date.now()),
      productionAmount: 0,
      consumptionAmount: 0,
      hourlyPrice: 0,
    },
  ]);

  useEffect(() => {
    fetchDataByDate();
  }, [date]);

  const fetchDataByDate = async () => {
    await getSingleDayData(date).then((result) => setDayData(result.data.data));
  };

  return { dayData };
};
