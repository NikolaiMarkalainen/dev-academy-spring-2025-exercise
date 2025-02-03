import { ISingleDateObject } from "./ISingleDateObject";

export interface ISingleDateResponse {
  success: boolean;
  message: string;
  data: ISingleDateObject;
}
