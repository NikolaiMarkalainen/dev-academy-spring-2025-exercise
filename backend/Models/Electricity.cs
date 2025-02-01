
using System.ComponentModel.DataAnnotations.Schema;

public class Electricity {
    [Column("id")]
    public required long Id { get; set; }
    [Column("date")]
    public DateTime Date { get; set; }
    [Column("starttime")]
    public DateTime StartTime { get; set; }
    [Column("productionamount")]
    public decimal? ProductionAmount { get; set; }
    [Column("consumptionamount")]
    public decimal? ConsumptionAmount { get; set; }
    [Column("hourlyprice")]
    public decimal? HourlyPrice { get; set; }
}