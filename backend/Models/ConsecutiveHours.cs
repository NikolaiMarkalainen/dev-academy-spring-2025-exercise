
using Microsoft.EntityFrameworkCore;

[Owned]
public class ConsecutiveHours 
{
    public required int Length { get; set; }

    public required List<int> DayTime { get; set; } = [];
}