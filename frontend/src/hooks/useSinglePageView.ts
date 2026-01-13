import { useEffect, useState } from "react";
import { GraphProps, ISingleDateObject } from "../types/types";
import { getSingleDayData } from "../services/electricitySerivce";
import { AllSeriesType } from "@mui/x-charts";

export const useSinglePageView = (date: string, graph: GraphProps) => {
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
  const [seriesType, setSeriesType] = useState<"line" | "bar">("line");
  const [series, setSeries] = useState<AllSeriesType[]>();

  useEffect(() => {
    const newSeries: AllSeriesType[] = [
      {
        type: seriesType,
        data: mapWithKey(graph.id),
        label: graph.label,
        color: graph.color
      }]
  
    if (graph.secondSeries) {
      newSeries.push({
        type: seriesType,
        data: mapWithKey(graph.secondSeries.id),
        label: graph.secondSeries.label,
        color: graph.secondSeries.color
      })    
    };
    setSeries(newSeries);
  }, [graph, dayData, seriesType])


  useEffect(() => {
    fetchDataByDate();
  }, [date]);

  
  const mapWithKey = <K extends keyof ISingleDateObject>(key: K): ISingleDateObject[K][] => {
    return dayData.map((m) => m[key]);
  }
  const fetchDataByDate = async () => {
    await getSingleDayData(date).then((result) => setDayData(result.data));
  };

  return { dayData, mapWithKey, seriesType, setSeriesType, series };
};
