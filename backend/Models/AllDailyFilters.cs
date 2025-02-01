

public class AllDailyFilters
{
    public required DateTime Date { get; set; }
    public required decimal AveragePrice { get; set; }
    public required decimal DailyConsumption { get; set; }
    public required ConsecutiveHours NegativePriceLength { get; set; }
}