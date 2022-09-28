class forgotPassword_PO {
  elements = {
    emailInput: () => cy.get("#email.form-control"),
    getResetLinkButton: () => cy.get('[data-cy="forgetPasswordResetButton"]'),
    loginError: () => cy.get(".alert-message"),
    getResetLink: () => cy.get(".form-heading-title"),
    validationError: () => cy.on(".window:alert"),
  };
  visitForgotPasswordPage() {
    cy.get(".forgot-password").click();
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/password-forgot"
    );
  }

  typeEmail(email) {
    this.elements.emailInput().type(email);
  }
  clickOnGetResetLink() {
    this.elements.getResetLinkButton().click();
  }
  verifyInvalidCredentialAlertMessage() {
    this.elements
      .loginError()
      .should("have.text", "User with given email address not found");
  }
  getResetLink() {
    this.elements.getResetLink().click();
  }
  // verifyEmptyCredentialAlertMessage(){
  //     this.elements.validationError.
  // // on(".window:alert", (txt) => {
  //    should("contains","Please fill out the field");
  // }
}

module.exports = new forgotPassword_PO();
