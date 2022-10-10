const searchInProjectModule_PO = require("../../page_objects/searchInProjectModule_PO");

describe("Search in project module", function () {
  beforeEach(function () {
    cy.login();
    searchInProjectModule_PO.visitProjectModulePage();
  });
  it("search kies in project module", function () {
    cy.intercept("GET", "/api/project").as("search");
    cy.wait("@search");
    cy.get('.topnav input')
      .type("kies")
      .should("have.value", "kies");
    cy.get(".table tbody tr")
      .should("have.length", 1)
      .each((tr) => {
        cy.wrap(tr).find("td").eq(1).should("have.value", "kies");
      });
  });
});
