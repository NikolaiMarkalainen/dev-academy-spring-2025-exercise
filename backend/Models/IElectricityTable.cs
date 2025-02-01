public interface IElectricityTable
{
    Task<PaginatedElectricity<DailyValues>> GetTableValues(int pageIndex, int pageSize);
    
}