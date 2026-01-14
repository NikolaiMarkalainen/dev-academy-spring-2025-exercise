const baseUrl = "http://localhost:5173";

describe("Web url Curl with different urls", () => {
  it("Base url visit", () => {
    cy.visit(baseUrl);
    // 5 rows Date, Production, Consumption, Price, Ngtv
    cy.get("[data-testid=headers]").should("be.visible").and("have.length", 5);
    const rows = cy.get("[data-testid=data-rows]").then(($rows) => {
      // row length default length is 10 on plain URL
      rows.should("be.visible").and("have.length", 10);
      // query each row and put them into values array to compare
      const values = [...$rows].map((row) => {
        const element = row.querySelector("[data-testid=date]");
        return new Date(element?.textContent!);
      });
      let prevDate: Date | null = null;
      for (const date of values) {
        if (prevDate) {
          expect(prevDate.getTime()).to.be.gte(date.getTime());
        }
        prevDate = date;
      }
    });
  });
});
