using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Generalmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dailyelectricity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AveragePrice = table.Column<decimal>(type: "numeric", nullable: false),
                    DailyConsumption = table.Column<decimal>(type: "numeric", nullable: false),
                    NegativePriceLength_Length = table.Column<int>(type: "integer", nullable: true),
                    NegativePriceLength_DayTime = table.Column<List<int>>(type: "integer[]", nullable: true),
                    Production = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dailyelectricity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Electricity",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    starttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    productionamount = table.Column<decimal>(type: "numeric", nullable: false),
                    consumptionamount = table.Column<decimal>(type: "numeric", nullable: false),
                    hourlyprice = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Electricity", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dailyelectricity");

            migrationBuilder.DropTable(
                name: "Electricity");
        }
    }
}
