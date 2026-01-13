

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
    label: 'Daily Consumption (mw/h)'
  },
  {
    id: 'negativePriceLength',
    numeric: true,
    label:  "Consecutive hours of negative prices ",
  },
  {
    id: 'production',
    numeric: true,
    label: 'Production (MW/h)',
  }

]
