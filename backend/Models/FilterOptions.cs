

public enum FilterOptions {
    Date,
    AveragePrice,
    DailyConsumption,
    NegativePriceLength,
    Production
}

public class FilterRequest {
    public bool? OrderBy { get; set; } = false;

    public FilterOptions? Filter { get; set; }

    public int PageIndex { get; set; }

    public int PageSize { get; set; }
}

