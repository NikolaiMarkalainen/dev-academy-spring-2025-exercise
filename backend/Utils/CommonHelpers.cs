
namespace backend.Utils
{
    public class CommonHelpers
    {
        public static DateTime ConverToUTC(DateTime date)
        {
            return DateTime.SpecifyKind(date, DateTimeKind.Utc);
        } 
    }
}