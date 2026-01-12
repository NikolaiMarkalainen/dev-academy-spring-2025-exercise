

// add icons to this record to use the key for icon and value for string name
export const FilterOptions: Record<number,string> = {
  1: "Date",
  2: "Average Price",
  3: "Daily Consumption",
  4: "Production",
  5: "Negative Price Length",
}

export interface IElectricFieldRows {
  date: Date
}