// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("test123").type("{enter}")
    // cy.get('form > .d-grid').click()
    // cy.get('[data-cy="loginButton"]').click()

  })
  Cypress.Commands.add('invalidLogin', (emailaddress, password) => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get("#email").type(emailaddress);
    cy.get("#password").type(password).type("{enter}")
    // cy.get('form > .d-grid').click()
    // cy.get("[type='submit']").click()

  })
  Cypress.Commands.add('project', (name, clientname) => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get('[data-cy="projectsSidebarButton"]').contains("Projects").click();
    cy.get('[data-cy="addProjectButton"]').click();
    
   
  })