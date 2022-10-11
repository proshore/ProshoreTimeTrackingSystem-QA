const { getRandomString } = require("../../../utilites/helper");
const addProject_PO = require("../../page_objects/AddProject/addProject_PO");

describe("Search in project module", function () {
    beforeEach(function () {
      cy.login();
addProject_PO.visitProjectModulePage()
    });
    it("Should create a new project ", function () {
    const randomGenerateName = getRandomString()
    addProject_PO.projectInput(randomGenerateName)
    addProject_PO.clientInput()
    addProject_PO.createProject()    
  })
  it("click billable button", function () {
    cy.get('[data-cy="toggleBillable"]').click();
    cy.get('[data-cy="toggleBillable"]')
      .invoke("attr", "title")
      .should("eq", "Billable");
  });
  it("Should logout", function(){
    cy.get('.h-6 > path').click()
    cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
  } )
    })
  