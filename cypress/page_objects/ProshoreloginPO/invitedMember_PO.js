class invitedmember_PO {
  elements = {
    nameInput: () => cy.get("#name"),
    emailInput: () => cy.get("#email"),
    sendInviteBtn: () => cy.get(".mb-2 > .btn"),
    selectRoles: () => cy.get('.form-select').select("MEMBER").should("have.value", 1),
  };

  visitLoginPage() {
    cy.visit("https://frontendbootcamp.proshore.eu/accounts/login");
    cy.contains("Log in");
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/login"
    );
  }
  
  visitInvitedMemberPage() {
    cy.visit("https://frontendbootcamp.proshore.eu/teams")
    cy.get('[data-cy="teamsSidebarButton"]').contains("Teams").click();
    cy.get(".btn-sm.btn-primary").click();
    cy.url().should("eq","https://frontendbootcamp.proshore.eu/teams")
  }
  buttonClosed(){
  cy.get(".btn-close").click();
  cy.url().should("eq", "https://frontendbootcamp.proshore.eu/teams");
  }

  typeName(name) {
    this.elements.nameInput().type(name);
  }

  typeEmail(email) {
    this.elements.emailInput().type(email);
  }

  clickSendInvitedBtn() {
    this.elements.sendInviteBtn().click({ force: true });
  }
  selectRoles(){
    this.elements.selectRoles()
  }
}

module.exports = new invitedmember_PO();
