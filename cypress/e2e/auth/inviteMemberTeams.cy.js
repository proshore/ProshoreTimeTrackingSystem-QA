const { getRandomEmail, getRandomString } = require("../../../utilites/helper");
const invitedMember_PO = require("../../page_objects/ProshoreloginPO/invitedMember_PO");

describe("Teams module", function () {
  beforeEach(function () {
    invitedMember_PO.visitLoginPage();
    cy.login();
    invitedMember_PO.visitInvitedMemberPage();
  });
  it("URL should be https://frontendbootcamp.proshore.eu/teams", function () {
    cy.url().should("eq", "https://frontendbootcamp.proshore.eu/teams");
  });

  it("Add new member with empty details", function () {
    invitedMember_PO.clickSendInvitedBtn();
    cy.on(".window:alert", (txt) => {
      expect(txt).to.contains("Please fill out the field");
    });
  });

  it("Add new member with empty name", function () {
    const randomGenerateEmail = getRandomEmail();
    invitedMember_PO.typeEmail(randomGenerateEmail);
    invitedMember_PO.selectRoles();
    // cy.selectRoles();
    invitedMember_PO.clickSendInvitedBtn();
    cy.on(".window:alert", (txt) => {
      expect(txt).to.contains("Please fill out the field");
    });
  });

  it("Add new member with empty email address", function () {
    const randomGenerateName = getRandomString();
    invitedMember_PO.typeName(randomGenerateName);
    invitedMember_PO.selectRoles();
    invitedMember_PO.clickSendInvitedBtn();
    cy.on(".window:alert", (txt) => {
      expect(txt).to.contains("Please fill out the field");
    });
  });
  it("Add new member with empty Roles", function () {
    const randomGenerateName = getRandomString();
    const randomGenerateEmail = getRandomEmail();
    invitedMember_PO.typeName(randomGenerateName);
    invitedMember_PO.typeEmail(randomGenerateEmail);
    invitedMember_PO.clickSendInvitedBtn();
    cy.on(".window:alert", (txt) => {
      expect(txt).to.contains("Please select an iten in the list.");
    });
  });
  it("Add new member without using special character in email address", function () {
    const randomGenerateName = getRandomString();
    invitedMember_PO.typeName(randomGenerateName);
    invitedMember_PO.typeEmail(randomGenerateName);
    invitedMember_PO.clickSendInvitedBtn();
    cy.on(".window:alert", (txt) => {
      expect(txt).to.contains(
        "Please include an '@' in the email address.'test' is missing an '@'."
      );
    });
  });
  it("cross button should be close the add new member form", function () {
    cy.get(".btn-close").click();
    cy.url().should("eq", "https://frontendbootcamp.proshore.eu/teams");
  });

  it("New member should show in invited members list", function () {
    const randomGenerateName = getRandomString();
    const randomGenerateEmail = getRandomEmail();
    invitedMember_PO.typeName(randomGenerateName);
    invitedMember_PO.typeEmail(randomGenerateEmail);
    invitedMember_PO.selectRoles();
    invitedMember_PO.clickSendInvitedBtn();

    cy.intercept("GET", "/api//invite/invited-users").as("search");
    cy.wait("@search");
    invitedMember_PO.buttonClosed();
    cy.get("tbody > tr").should("contain.text", randomGenerateName);
  });

//   it.only("revoke the invited member", function () {
//     invitedMember_PO.buttonClosed();
//     cy.get('.dropdownMenuButton1').select("Revoke").should("have.value", 1)
//     // cy.get(':nth-child(1) > :nth-child(7) > #dropdownMenuButton1')
//     // cy.get('tbody > tr > #dropdownMenuButton1').click()
//     // cy.get(".dropdownMenuButton1").click();
//     // cy.get(' .dropdown-menu > li > .dropdown-item').click()
//     //   cy.get(':nth-child(1) > :nth-child(7) > #dropdownMenuButton1')
//   });

});
