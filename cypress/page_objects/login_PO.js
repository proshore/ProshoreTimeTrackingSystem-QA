class login_PO {
  elements = {
    emailInput: () => cy.get('[data-cy="emailInputField"]').eq(0),
    passwordInput: () => cy.get('[data-cy="emailInputField"]').eq(1),
    loginBtn: () => cy.get('[data-cy="loginButton"]'),
    loginError: () => cy.get(".alert-message"),
    validationError: () => cy.get(".text-danger"),
  };
  visitLoginPage() {
    cy.visit("https://frontendbootcamp.proshore.eu/accounts/login");
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/login"
    );
  }

  typeEmail(email) {
    this.elements.emailInput().type(email);
  }
  typePassword(password) {
    this.elements.passwordInput().type(password);
  }
  clickLogin() {
    this.elements.loginBtn().click({ force: true });
  }

  // errorMessage(){
  //     this.elements.validationError()
  // }
  verifyInvalidCredentialAlertMessage() {
    this.elements
      .loginError()
      .should("have.text", "Please enter valid email or password.");
  }
}

module.exports = new login_PO();
