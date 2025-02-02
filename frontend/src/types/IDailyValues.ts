export interface IConsecutiveHours {
  length: number;
  hours: number[];
}

export interface IDailyValues {
  id: number;
  date: Date;
  averagePrice: number;
  dailyConsumption: number;
  negativePriceLength: IConsecutiveHours;
  production: number;
}
