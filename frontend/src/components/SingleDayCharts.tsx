import { Line } from "react-chartjs-2";
import { ISingleDateObject } from "../types/ISingleDateObject";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import "../index.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  data: ISingleDateObject[];
  date: string;
}

export const SingleDayCharts = (props: Props) => {
  const [activeDataset, setActiveDataset] = useState<
    "hourlyPrice" | "consumption" | "production"
  >("hourlyPrice");

  const datasets = [
    {
      label: "Hourly Price",
      data: props.data.map((m) => m.hourlyPrice),
      fill: false,
      borderColor: "rgb(49, 243, 75)",
      tension: 0.1,
      hidden: activeDataset !== "hourlyPrice",
    },
    {
      label: "Consumption (MWh/h)",
      data: props.data.map((m) => m.consumptionAmount / 1000),
      fill: false,
      borderColor: "rgb(141, 99, 255)",
      tension: 0.1,
      hidden: activeDataset !== "consumption",
    },
    {
      label: "Production (MWh/h)",
      data: props.data.map((m) => m.productionAmount),
      fill: false,
      borderColor: "rgb(226, 183, 40)",
      tension: 0.1,
      hidden: activeDataset !== "production",
    },
  ];

  const lineAxisData = {
    labels: props.data.map((m) => `${new Date(m.startTime).getHours()}`),
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Hourly Data ${props.date}`,
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: { title: { display: true, text: "Hour" } },
      y: { title: { display: true, text: "Value" } },
    },
  };

  return (
    <div>
      <div className="single-day-chart-container">
        <Line data={lineAxisData} options={options} />
      </div>
    </div>
  );
};
