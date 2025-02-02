import { IPaginatedData } from "./IPaginatedData";

export interface IPaginatedResult {
  success: boolean;
  message: string;
  data: IPaginatedData;
}
