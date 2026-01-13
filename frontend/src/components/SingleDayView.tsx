import { useNavigate, useParams } from "react-router-dom";
import { useSinglePageView } from "../hooks/useSinglePageView";
import { SingleDayCharts } from "./SingleDayCharts";

export const SingleDayView = () => {
  const { date } = useParams();
  if (!date) return <>Unable to find data</>;
  const { dayData } = useSinglePageView(date);
  console.log(dayData);

  const navigate = useNavigate();

  return (
    <div>
      <SingleDayCharts data={dayData} date={date} />
      <div className="single-day-button">
      </div>
    </div>
  );
};
