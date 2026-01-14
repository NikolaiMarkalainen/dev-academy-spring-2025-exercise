import { GraphProps } from "../types/types";
import { useCallback, useEffect, useState } from "react";
import { AllSeriesType } from "@mui/x-charts";
import { ISingleDateObject } from "../types/types";
export const useGraphFieldParsing = (dayData: ISingleDateObject[], graph: GraphProps) => {
  const [seriesType, setSeriesType] = useState<"line" | "bar">("line");
  const [series, setSeries] = useState<AllSeriesType[]>();

  // cache function between re-renders
  const mapWithKey = useCallback(
    <K extends keyof ISingleDateObject>(key: K): ISingleDateObject[K][] => {
      return dayData.map((m) => m[key]);
    },
    [dayData],
  );

  useEffect(() => {
    const newSeries: AllSeriesType[] = [
      {
        type: seriesType,
        data: mapWithKey(graph.id),
        label: graph.label,
        color: graph.color,
      },
    ];

    if (graph.secondSeries) {
      newSeries.push({
        type: seriesType,
        data: mapWithKey(graph.secondSeries.id),
        label: graph.secondSeries.label,
        color: graph.secondSeries.color,
      });
    }
    setSeries(newSeries);
  }, [graph, dayData, seriesType, mapWithKey]);

  return {
    mapWithKey,
    seriesType,
    setSeriesType,
    series,
  };
};
