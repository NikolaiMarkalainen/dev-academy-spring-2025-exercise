import { useNavigate, useParams } from "react-router-dom";
import { useSinglePageView } from "../hooks/useSinglePageView";
import { Header } from "./Header";
import { SingleDayCharts } from "./SingleDayCharts";
import { Button } from "./shared/Button";

export const SingleDayView = () => {
  const { date } = useParams();
  if (!date) return <>Unable to find data</>;
  const { dayData } = useSinglePageView(date);
  console.log(dayData);

  const navigate = useNavigate();

  return (
    <div>
      <Header title={`Hourly data on day ${date}`} />
      <SingleDayCharts data={dayData} date={date} />
      <div className="single-day-button">
        <Button
          text="Back to Home page"
          width="75vw"
          function={() => navigate("/")}
        />
      </div>
    </div>
  );
};
