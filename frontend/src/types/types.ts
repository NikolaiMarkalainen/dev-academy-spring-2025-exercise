// Single day view obj
export interface IDailyValues {
  id: number;
  date: Date;
  dailyConsumption: number;
  negativePriceLength: number;
  averagePrice: number;
  production: number;
}

// Main page object with data
export interface IPaginatedData {
  pageIndex: number;
  totalPages: number;
  items: IDailyValues[];
  totalItems: number;
}

export interface ISingleDateObject {
  id: number;
  date: Date;
  startTime: Date;
  productionAmount: number;
  consumptionAmount: number;
  hourlyPrice: number;
}
// generic for dynamic data since api returns everything in this format
export interface IPaginatedResult<T> {
  success: boolean;
  message: string;
  data: T;
}

interface HeadCell {
  id: keyof IDailyValues;
  label: string;
  numeric: boolean;
}

export const HeadCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    label: "Date",
  },
  {
    id: "production",
    numeric: true,
    label: "Production (MW/h)",
  },
  {
    id: "dailyConsumption",
    numeric: true,
    label: "Daily Consumption (MW/h)",
  },
  {
    id: "averagePrice",
    numeric: true,
    label: "Average Price",
  },
  {
    id: "negativePriceLength",
    numeric: true,
    label: "Consecutive hours of negative prices ",
  },
];

export interface GraphProps {
  // Dont need these fields for anything in particular maybe?
  id: Exclude<keyof ISingleDateObject, "startTime" | "date" | "id">;
  color: string;
  label: string;
  secondSeries?: GraphProps;
}

export const GraphFields: readonly GraphProps[] = [
  {
    id: "consumptionAmount",
    color: "#edc949",
    label: "Consumption of Electricity (MW)/h",
  },
  {
    id: "hourlyPrice",
    color: "#e15759",
    label: "Hourly price of electricity",
  },
  {
    id: "productionAmount",
    color: "#ff9da7",
    label: "Produced amount of Electricity (MW)/h",
  },
  {
    id: "productionAmount",
    secondSeries: {
      id: "consumptionAmount",
      color: "#bab0ab",
      label: "Consumed Amount of Electricity (MW)/h",
    },
    color: "#59a14f",
    label: "Produced amount of Electricity (MW)/h",
  },
];
