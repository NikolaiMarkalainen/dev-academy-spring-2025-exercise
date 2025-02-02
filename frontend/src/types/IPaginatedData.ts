import { IDailyValues } from "./IDailyValues";

export interface IPaginatedData {
  pageIndex: number;
  totalPages: number;
  items: IDailyValues[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
