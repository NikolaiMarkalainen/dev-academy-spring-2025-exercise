

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
    OrderBy
}

public static class QueryConfig
{
    public static readonly SortedDictionary<string, QueryFields> FieldSorts =
    new(StringComparer.OrdinalIgnoreCase)
    {
        {"date", QueryFields.Date},
        {"price", QueryFields.AveragePrice},
        {"consumption", QueryFields.DailyConsumption},
        {"nlength", QueryFields.NegativePriceLength},
        {"production", QueryFields.Production},
    };

    public static readonly SortedDictionary<string, SortFields> PageSorts =
    new(StringComparer.OrdinalIgnoreCase)
    {
        {"page", SortFields.PageIndex},
        {"dir",  SortFields.OrderBy},
        {"size", SortFields.PageSize }
    };
}

public sealed record QueryResult<T>(
    IQueryable<T> Query,
    int PageSize,
    int PageIndex);
