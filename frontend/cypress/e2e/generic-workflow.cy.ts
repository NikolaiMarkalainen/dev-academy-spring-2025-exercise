// CHANGE URL IF RUNNING LOCALLY TO
// http://localhost:5173
// else in docker use
// http:localhost:8080
const baseUrl = "http://localhost:8080";

const sorts = ["negativePriceLength", "production", "dailyConsumption", "date", "averagePrice"];
const verifyOrderLogic = <T>(
  selector: string,
  mapFn: (str: string) => T,
  compare: (a: T, b: T, asc: boolean) => void,
  asc: boolean,
) => {
  cy.get("[data-testid=data-rows]").then(($rows) => {
    const values = [...$rows].map((row) => {
      return mapFn(row.querySelector(selector)?.textContent!);
    });
    for (let i = 1; i < values.length; i++) {
      compare(values[i - 1], values[i], asc);
    }
  });
};

const compareDates = (prev: Date, curr: Date, asc: boolean) => {
  if (asc) {
    expect(prev.getTime()).to.be.lte(curr.getTime());
  } else {
    expect(prev.getTime()).to.be.gte(curr.getTime());
  }
};

const compareNumbers = (prev: number, curr: number, asc: boolean) => {
  if (asc) {
    expect(prev).to.be.lte(curr);
  } else {
    expect(prev).to.be.gte(curr);
  }
};

type DateColumn = {
  kind: "date";
  selector: string;
  mapFn: (str: string) => Date;
  compareFn: (prev: Date, curr: Date, asc: boolean) => void;
};

type NumberColumn = {
  kind: "number";
  selector: string;
  mapFn: (str: string) => number;
  compareFn: (prev: number, curr: number, asc: boolean) => void;
};

type Column = DateColumn | NumberColumn;

// 5 rows Date, Production, Consumption, Price, Ngtv
const columns: Column[] = [
  {
    kind: "date",
    selector: "[data-testid=date]",
    mapFn: (str: string) => new Date(str),
    compareFn: compareDates,
  },
  {
    kind: "number",
    selector: "[data-testid=production]",
    //regex on all commas remove the as toLocaleString is addign them
    // there r instances with double commas thats why regex is needed
    mapFn: (str: string) => Number(str.replace(/,/g, "")),
    compareFn: compareNumbers,
  },
  {
    kind: "number",
    selector: "[data-testid=consumption]",
    mapFn: (str: string) => Number(str.replace(",", "")),
    compareFn: compareNumbers,
  },
  {
    kind: "number",
    selector: "[data-testid=price]",
    mapFn: (str: string) => Number(str.replace(",", "")),
    compareFn: compareNumbers,
  },
  {
    kind: "number",
    selector: "[data-testid=negative]",
    mapFn: (str: string) => Number(str.replace(",", "")),
    compareFn: compareNumbers,
  },
];

const selectRowSize = (size: 10 | 25 | 50) => {
  cy.get("[data-testid=pagination]")
    .should("be.visible")
    .within(() => {
      cy.get(".MuiSelect-select").click();
    });
  cy.get("ul.MuiMenu-list").contains(size).click();
  cy.get("[data-testid=data-rows]").should("have.length", size);
};

describe("Main page tests", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });
  it("Order Directions work as expected", () => {
    cy.get("[data-testid=headers]")
      .should("have.length", columns.length)
      .each(($header, index) => {
        const column = columns[index];
        cy.wrap($header).click();
        // TEST ASC and DESC to work properly on the page for different sortings
        if (column.kind === "date") {
          verifyOrderLogic<Date>(column.selector, column.mapFn, column.compareFn, true);
          cy.wrap($header).click();
          verifyOrderLogic<Date>(column.selector, column.mapFn, column.compareFn, false);
        } else {
          verifyOrderLogic<number>(column.selector, column.mapFn, column.compareFn, true);
          cy.wrap($header).click();
          verifyOrderLogic<number>(column.selector, column.mapFn, column.compareFn, false);
        }
      });
  });
  it("Can change row amount and works as intended", () => {
    selectRowSize(10);
    selectRowSize(25);
    selectRowSize(50);
  });
  it("Can move to different page back and forth", () => {
    cy.get("[data-testid=pagination]").within(() => {
      const back = cy.get('button[aria-label="Go to previous page"]');
      const next = cy.get('button[aria-label="Go to next page"]');
      next.click();
      back.click();
    });
  });
  it("Test different urls with different query params", () => {
    for (const sort of sorts) {
      cy.visit(`${baseUrl}/?sortBy=${sort}&order=asc&page=1`);
      cy.get("[data-testid=headers]").should("be.visible");
    }
  });
});
describe("Single Page view tests", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });
  it("Can access single page view and close it", () => {
    cy.get("[data-testid=data-rows]").first().click();
    cy.get("[data-testid=close]").click();
    cy.get("[data-testid=data-rows]").should("be.visible");
  });
  it("Has visible 4 graphs on page", () => {
    cy.get("[data-testid=data-rows]").first().click();
    cy.get("[data-testid=graph]").should("have.length", 4);
  });
  it("Can change chart types for each graph", () => {
    cy.get("[data-testid=data-rows]").first().click();
    cy.get("[data-testid=dropdown]").each(($graph) => {
      cy.wrap($graph).within(() => {
        cy.get("div.MuiSelect-select").click();
      });
      cy.get("ul.MuiMenu-list").contains("Bar").click();
    });
    cy.get("[data-testid=dropdown]").each(($graph) => {
      cy.wrap($graph).within(() => {
        cy.get("div.MuiSelect-select").click();
      });
      cy.get("ul.MuiMenu-list").contains("Line").click();
    });
  });
  it("Can reach single page view via url", () => {
    cy.visit(`${baseUrl}/date/2023-08-01`);
  });
});
