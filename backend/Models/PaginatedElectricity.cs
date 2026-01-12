
public class PaginatedElectricity<T>(List<T> items, int pageIndex, int totalPages, int totalItems)
{
    public List<T> Items { get; } = items;
    public int PageIndex { get; } = pageIndex;
    public int TotalPages { get; } = totalPages;
    public bool HasPreviousPage => PageIndex > 1;
    public bool HasNextPage => PageIndex < TotalPages;
    public int TotalItems { get; } = totalItems;
}