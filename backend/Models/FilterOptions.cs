

// Diffrent query params user can utilize when using the dashboard
public enum QueryFields
{
    Date,
    AveragePrice,
    DailyConsumption,
    NegativePriceLength,
    Production,
}
public enum SortFields
{
    PageSize,
    PageIndex,
    OrderBy,
    SortBy
}

public static class QueryConfig
{
    public static readonly SortedDictionary<string, QueryFields> FieldSorts =
    new(StringComparer.OrdinalIgnoreCase)
    {
        {"date", QueryFields.Date},
        {"averagePrice", QueryFields.AveragePrice},
        {"dailyConsumption", QueryFields.DailyConsumption},
        {"negativePriceLength", QueryFields.NegativePriceLength},
        {"production", QueryFields.Production},
    };

    public static readonly SortedDictionary<string, SortFields> PageSorts =
    new(StringComparer.OrdinalIgnoreCase)
    {
        {"page", SortFields.PageIndex},
        {"sortBy",  SortFields.SortBy},
        {"size", SortFields.PageSize },
        {"order", SortFields.OrderBy}
    };
}

public sealed record QueryResult<T>(
    IQueryable<T> Query,
    int PageSize,
    int PageIndex);
