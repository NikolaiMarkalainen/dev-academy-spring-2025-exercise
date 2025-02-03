export interface IConsecutiveHours {
  length: number;
  hours: number[];
}

export interface IDailyValues {
  id: number;
  date: Date;
  dailyConsumption: number;
  negativePriceLength: IConsecutiveHours;
  averagePrice: number;

  production: number;
}
