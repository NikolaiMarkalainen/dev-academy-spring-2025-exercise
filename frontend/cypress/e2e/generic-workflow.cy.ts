import {
  IPaginatedRequst,
  FilterOptions,
} from "../../src/types/IPaginatedRequest";

const website = "http://localhost:8080";

const compareRows = (column: number, number: boolean) => {
  cy.get(".grid-row")
    .eq(column)
    .find("div")
    .eq(column)
    .then(($firstRow) => {
      const firstRowDate = number
        ? Number($firstRow.text())
        : new Date($firstRow.text().trim());

      cy.get(".grid-row")
        .eq(column + 1)
        .find("div")
        .eq(column)
        .then(($secondRow) => {
          const secondRowDate = number
            ? Number($secondRow.text())
            : new Date($secondRow.text().trim());

          expect(firstRowDate).to.be.lte(secondRowDate);
        });
    });
};

describe("Backend api requests", () => {
  beforeEach(() => {
    cy.visit(website);
  });
  it("Daily generic endpoint", () => {
    cy.intercept({ method: "GET", url: "/api/dailyelectricity/data" }).as(
      "getData",
    );
  });
  it("Daily data by id", () => {
    cy.intercept({
      method: "GET",
      url: "/api/dailyelectricity/?date=2024.09.29",
    }).as("getData");
  });
  it("Different filters applied to api", () => {
    Object.values(FilterOptions).forEach((filter) => {
      if (typeof filter === "number") {
        const requestVariation: IPaginatedRequst = {
          orderBy: true,
          filter: filter,
          pageIndex: 1,
          pageSize: 10,
        };
        cy.request({
          method: "POST",
          url: "/api/FilterElectricity",
          body: requestVariation,
        });
      }
    });
  });
});

describe("Frontend UI flow", () => {
  beforeEach(() => {
    cy.visit(website);
  });
  it("Can click next & previous button ", () => {
    cy.get(".page-change button").should("exist");
    cy.get(".page-change button").first().should("have.text", "<");
    cy.get(".page-change button").contains("1").should("exist");
    cy.get(".page-change button").contains(">").click();
    cy.get(".page-change button").contains("<").click();
  });
  it("Number of item buttons work", () => {
    cy.get(".select-items p").contains("10").click();
    cy.get(".data-grid .grid-row").should("have.length", 10);

    cy.get(".select-items p").contains("25").click();
    cy.get(".data-grid .grid-row").should("have.length", 25);

    cy.get(".select-items p").contains("50").click();
    cy.get(".data-grid .grid-row").should("have.length", 50);

    cy.get(".select-items p").contains("100").click();
    cy.get(".data-grid .grid-row").should("have.length", 100);
  });
  it("Filters can be applied for data set", () => {
    cy.get(".grid-header div").eq(0).should("contain.text", "Date").click();
    cy.get(".ascdesc").click();
    compareRows(0, false);
    cy.get(".grid-header div")
      .eq(1)
      .should("contain.text", "Average Price")
      .click();
    compareRows(1, true);

    cy.get(".grid-header div")
      .eq(2)
      .should("contain.text", "Daily Consumption (MWh/h)")
      .click();
    compareRows(2, true);

    cy.get(".grid-header div")
      .eq(3)
      .should("contain.text", "Consecutive hours of negative prices")
      .click();

    compareRows(3, true);
    cy.get(".grid-header div")
      .eq(4)
      .should("contain.text", "Production (MWh/h)")
      .click();
    compareRows(4, true);
  });
  it("Can navigate to single day view", () => {
    cy.get(".grid-row").eq(0).find("div").eq(0).click();
    cy.get(".single-day-button").click();
  });
});
