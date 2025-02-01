

using System.ComponentModel.DataAnnotations.Schema;

public class DailyValues
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required DateTime Date { get; set; }
    public decimal? AveragePrice { get; set; }
    public decimal? DailyConsumption { get; set; }
    public ConsecutiveHours? NegativePriceLength { get; set; }
    public decimal? Production { get; set; }
}