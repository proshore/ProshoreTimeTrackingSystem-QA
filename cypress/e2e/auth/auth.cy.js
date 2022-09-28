const { getRandomEmail, getRandomString } = require("../../../utilites/helper");
const forgotPassword_PO = require("../../page_objects/forgotPassword_PO");
const loginPagePO = require("../../page_objects/login_PO");

describe("authentication module", function () {
  beforeEach(function () {
    loginPagePO.visitLoginPage();
  });
  it("URL should be https://frontendbootcamp.proshore.eu/accounts/login", function () {
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/login"
    );
  });
  it("verify valid login", function () {
    cy.login();
  });

  it(" should not be submit with empty details", function () {
    loginPagePO.clickOnLoginButton();
    loginPagePO.elements.loginBtn().should("be.disabled");
  });

  it("Verify the validation msg when login is attempted with less than 6 letter password", function () {
    const randomGenerateEmail = getRandomEmail();
    const randomGenerateName = getRandomString(3);
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickOnLoginButton();
    loginPagePO.verifyPasswordLengthErrorMessage();
  });
  it("Verify the login process with invalidLogin credentials ", function () {
    const randomGenerateEmail = getRandomEmail();
    const randomGenerateName = getRandomString(7);
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickOnLoginButton();
    loginPagePO.verifyInvalidCredentialAlertMessage();
  });
  it("Password should be visible by clicking the toggle_icon eye-slash", function () {
    const randomGenerateName = getRandomString(5);
    loginPagePO.typePassword(randomGenerateName);
    cy.get("#showPassword").click();
    cy.get("#password").invoke("attr", "type").should("eq", "text");
  });
  it("It should not be submit with empty email address", function () {
    const randomGenerateName = getRandomString(6);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickOnLoginButton();
    loginPagePO.elements.loginBtn().should("be.disabled");
  });
  it("Should not be submit with empty password", function () {
    const randomGenerateEmail = getRandomEmail();
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.clickOnLoginButton();
    loginPagePO.elements.loginBtn().should("be.disabled");
  });
  it("It should not be submit with  correct email address and incorrect password", function () {
    const randomGenerateName = getRandomString(7);
    loginPagePO.typeEmail(Cypress.env("APP_EMAIL"));
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickOnLoginButton();
    loginPagePO.verifyInvalidCredentialAlertMessage();
  });

  it("It should not be submit with incorrect email address and correct password", function () {
    const randomGenerateEmail = getRandomEmail();
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(Cypress.env("APP_PASSWORD"));
    loginPagePO.clickOnLoginButton();
    loginPagePO.verifyInvalidCredentialAlertMessage();
  });
  it("clicked on forget password redirected to forget password page", function () {
    forgotPassword_PO.visitForgotPasswordPage();
  });

  it(" should  be submit with empty emailaddress", function () {
    forgotPassword_PO.visitForgotPasswordPage();
    forgotPassword_PO.clickOnGetResetLink();
    // forgotPassword_PO.verifyEmptyCredentialAlertMessage();

    // cy.on(".window:alert", (txt) => {
    //   expect(txt).to.contains("Please fill out the field");
  });

  it(" should  be submit with incorrect email address in reset password page", function () {
    forgotPassword_PO.visitForgotPasswordPage();
    const randomGenerateEmail = getRandomEmail();
    forgotPassword_PO.typeEmail(randomGenerateEmail);
    forgotPassword_PO.clickOnGetResetLink();
    forgotPassword_PO.verifyInvalidCredentialAlertMessage();
  });
  it(" should  be submit with correct email address in reset password page", function () {
    forgotPassword_PO.visitForgotPasswordPage();
    forgotPassword_PO.typeEmail("test@test.com");
    forgotPassword_PO.clickOnGetResetLink();
    forgotPassword_PO.getResetLink();

    // cy.get(".form-heading-title").should("have.text", "Check your mail");
  });

  it("Access admin portal via url", function () {
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/login"
    );

    cy.location("origin").then((URL) => {
      expect(URL).to.eq("https://frontendbootcamp.proshore.eu");
      cy.visit(URL + "/tracker");
      cy.get(".form-heading-title").should("have.text", "Log in");
      cy.url().should(
        "eq",
        "https://frontendbootcamp.proshore.eu/accounts/login?next=/tracker"
      );
    });
  });
});
