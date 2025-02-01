﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DailyValues", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal?>("AveragePrice")
                        .HasColumnType("numeric");

                    b.Property<decimal?>("DailyConsumption")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal?>("Production")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.ToTable("dailyelectricity", (string)null);
                });

            modelBuilder.Entity("Electricity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<decimal?>("ConsumptionAmount")
                        .HasColumnType("numeric")
                        .HasColumnName("consumptionamount");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date");

                    b.Property<decimal?>("HourlyPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("hourlyprice");

                    b.Property<decimal?>("ProductionAmount")
                        .HasColumnType("numeric")
                        .HasColumnName("productionamount");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("starttime");

                    b.HasKey("Id");

                    b.ToTable("electricitydata", (string)null);
                });

            modelBuilder.Entity("DailyValues", b =>
                {
                    b.OwnsOne("ConsecutiveHours", "NegativePriceLength", b1 =>
                        {
                            b1.Property<int>("DailyValuesId")
                                .HasColumnType("integer");

                            b1.Property<List<int>>("DayTime")
                                .IsRequired()
                                .HasColumnType("integer[]");

                            b1.Property<int>("Length")
                                .HasColumnType("integer");

                            b1.HasKey("DailyValuesId");

                            b1.ToTable("dailyelectricity");

                            b1.WithOwner()
                                .HasForeignKey("DailyValuesId");
                        });

                    b.Navigation("NegativePriceLength");
                });
#pragma warning restore 612, 618
        }
    }
}
