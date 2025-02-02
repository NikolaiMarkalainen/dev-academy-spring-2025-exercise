import { IDropDown } from "../types/IDropDown";
import { FilterOptions } from "../types/IPaginatedRequest";

export const getDropDownOptions = (): IDropDown[] => {
  return Object.values(FilterOptions)
    .filter((value) => typeof value === "number")
    .map((value) => ({
      key: value as FilterOptions,
      text: getFilterOptionText(value as FilterOptions),
    }));
};

const getFilterOptionText = (option: FilterOptions): string => {
  switch (option) {
    case FilterOptions.Date:
      return "Date";
    case FilterOptions.AveragePrice:
      return "Average Price";
    case FilterOptions.DailyConsumption:
      return "Daily Consumption";
    case FilterOptions.NegativePriceLength:
      return "Negative Price Length";
    case FilterOptions.Production:
      return "Production";
    default:
      return "Unknown";
  }
};
