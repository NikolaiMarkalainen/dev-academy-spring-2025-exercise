import { Box, TextField, MenuItem } from "@mui/material"
import { ChartDataProvider, ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis, BarPlot, LinePlot, ChartsAxisHighlight, ChartsSurface } from "@mui/x-charts"
import { useParams } from "react-router-dom";
import { useSinglePageView } from "../hooks/useSinglePageView";
import { GraphProps } from "../types/types";
export const Graph = ({ field }: { field: GraphProps }) => {
  const { date } = useParams();
  if (!date) return <>Unable to find data</>;
  const { mapWithKey, seriesType, setSeriesType, series} = useSinglePageView(date, field);

  console.log(series)
  return (
    <Box>
      <TextField select value={seriesType}
        onChange={(e) => {
          setSeriesType(e.target.value as 'line' | 'bar')
        }}
        label="Series type" sx={{ mt: '1rem', width: "100%" }}>
        <MenuItem value="line">Line</MenuItem>
        <MenuItem value="bar">Bar</MenuItem>
      </TextField>
      <ChartDataProvider series={series} xAxis={[
          {
            // this is a bit lengthy but its due to the fact we have to convert this in a funny way to work properly
            // and perhaps repeats itself but its probably not that bad in the large scheme of things
            data: mapWithKey("startTime").map((m) => new Date(m).getHours()),
            scaleType: 'band',
            id: field.id,
            height: 45
          }
        ]}
        height={480}>
        <ChartsLegend />
        <ChartsTooltip />
        <ChartsSurface>
          <ChartsXAxis label="Hours of the day" axisId={field.id} />
          <ChartsYAxis />
          <BarPlot />
          <LinePlot />
          <ChartsAxisHighlight x="line" />
        </ChartsSurface>
      </ChartDataProvider>
    </Box>
  );
};