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
