

export interface ISingleDateObject {
  id: number;
  date: Date;
  startTime: Date;
  productionAmount: number;
  consumptionAmount: number;
  hourlyPrice: number;
}

export interface IDailyValues {
  id: number;
  date: Date;
  dailyConsumption: number;
  negativePriceLength: number;
  averagePrice: number;
  production: number;
}
export interface IPaginatedData {
  pageIndex: number;
  totalPages: number;
  items: IDailyValues[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalItems: number;
}

export enum FilterOptions {
  Date,
  AveragePrice,
  DailyConsumption,
  NegativePriceLength,
  Production,
}

export interface IPaginatedRequst {
  orderBy: boolean;
  filter: FilterOptions;
  pageIndex: number;
  pageSize: number;
}
export interface IDropDown {
  key: number;
  text: string;
}

export interface IPaginatedResult {
  success: boolean;
  message: string;
  data: IPaginatedData;
}
interface HeadCell {
  id: keyof IDailyValues;
  label: string;
  numeric: boolean;
}

export const HeadCells: readonly HeadCell[] = [
  {
    id: 'date',
    numeric: false,
    label: 'Date'
  },
  {
    id: 'averagePrice',
    numeric: true,
    label: 'Average Price'
  },
  {
    id: 'dailyConsumption',
    numeric: true,
    label: 'Daily consumption mw/h'
  },
  {
    id: 'negativePriceLength',
    numeric: true,
    label: 'Negative consecutive hours',
  },
  {
    id: 'production',
    numeric: true,
    label: 'Produced Electricity',
  }

]

export interface IElectricFieldRows {
  date: Date
}