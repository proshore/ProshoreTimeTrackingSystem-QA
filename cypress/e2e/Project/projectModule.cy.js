const { getRandomString } = require("../../../utilites/helper");
const projectModule_PO = require("../../page_objects/projectModule_PO");

describe("Search in project module", function () {
  beforeEach(function () {
    cy.login();
    projectModule_PO.visitProjectModulePage();
  });
  it("Create a project with empty details ", function () {
    projectModule_PO.createProject();
  });
  it("Create Project with empty client name only", function () {
    const randomGenerateName = getRandomString();
    projectModule_PO.projectInput(randomGenerateName);
    projectModule_PO.createProject();
  });
  it("Create Project with empty Project name only", function () {
    projectModule_PO.clientInput();
    // .should("have.value", 1);
    projectModule_PO.createProject();
  });
  it("click billable button", function () {
    cy.get('[data-cy="toggleBillable"]').click();
    cy.get('[data-cy="toggleBillable"]')
      .invoke("attr", "title")
      .should("eq", "Billable");
  });
  it("should logout ", function(){
    cy.get('.h-6 > path').click()
    cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
  })
});
