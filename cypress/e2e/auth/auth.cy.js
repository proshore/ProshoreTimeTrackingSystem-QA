const { getRandomEmail, getRandomString } = require("../../../utilites/helper");
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
    loginPagePO.clickLogin();
    loginPagePO.elements.loginBtn().should("be.disabled");
  });

  it("Verify the validation msg when login is attempted with less than 6 letter password", function () {
    const randomGenerateEmail = getRandomEmail();
    const randomGenerateName = getRandomString(3);
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickLogin();
  loginPagePO.verifyPasswordLengthErrorMessage();

   
  });
  it("Verify the login process with invalidLogin credentials ", function () {
    const randomGenerateEmail = getRandomEmail();
    const randomGenerateName = getRandomString(7);
    // cy.log(randomGenerateName)
    // cy.pause()
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickLogin();
    loginPagePO.verifyInvalidCredentialAlertMessage();
  });
  it("should visible the password", function () {
    cy.login();
    cy.get("#showPassword").click();
    cy.get("#password").invoke("attr", "type").should("eq", "text");
  });
  it("It should not be submit with empty email address", function () {
    const randomGenerateName = getRandomString(6);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickLogin();
    loginPagePO.elements.loginBtn().should("be.disabled");
  });
  it(" should not be submit with empty password", function () {
    const randomGenerateEmail = getRandomEmail();
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.clickLogin();
    loginPagePO.elements.loginBtn().should("be.disabled");
  });
  it("It should not be submit with incorrect password", function () {
    const randomGenerateEmail = getRandomEmail();
    const randomGenerateName = getRandomString();
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickLogin();
    loginPagePO.verifyPasswordLengthErrorMessage();
  });

  it("It should not be submit with incorrect email address", function () {
    const randomGenerateEmail = getRandomEmail();
    const randomGenerateName = getRandomString(7);
    loginPagePO.typeEmail(randomGenerateEmail);
    loginPagePO.typePassword(randomGenerateName);
    loginPagePO.clickLogin();
    loginPagePO.verifyInvalidCredentialAlertMessage();
  });

  it("clicked on forget password redirected to forget password page", function () {
    cy.get(".forgot-password").click();
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/password-forgot"
    );
  });

  it("URL of reset password  should be https://frontendbootcamp.proshore.eu/accounts/password-forgot", function () {
    cy.get(".forgot-password").click();
    cy.url().should(
      "eq",
      "https://frontendbootcamp.proshore.eu/accounts/password-forgot"
    );
  });
  it(" should  be submit with empty emailaddress", function () {
    cy.get(".forgot-password").click();
    //  cy.location('pathname').should('include','/accounts/password-forget')
    cy.get(".form-control");
    cy.get(".btn-primary").click();

    cy.on(".window:alert", (txt) => {
      expect(txt).to.contains("Please fill out the field");
    });

    it(" should  be submit with incorrect email address in reset password page", function () {
      cy.get(".forgot-password").click();
      // cy.location('pathname').should('include','/accounts/password-forget')
      cy.get(".form-control.mt-1").type("mahimabh93@gmail.com{enter}");

      cy.get(".alert-message").should(
        "have.text",
        "User with given email address not found"
      );
    });
    it(" should  be submit with correct email address in reset password page", function () {
      cy.get(".forgot-password").click();
      // cy.location('pathname').should('include','/accounts/password-forget')
      cy.get(".form-control").type("test@test.com{enter}");
      // cy.get(".btn-primary").click();
      cy.get(".form-heading-title").should("have.text", "Check your mail");
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
});
