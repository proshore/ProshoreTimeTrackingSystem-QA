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
    //Visit Login Page
    cy.visit('https://frontendbootcamp.proshore.eu/accounts/login')
    cy.contains('Log in')
    cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
    
    cy.get('[data-cy="emailInputField"]').eq(0).type(Cypress.env('APP_EMAIL'))
    cy.get('[data-cy="emailInputField"]').eq(1).type(Cypress.env('APP_PASSWORD'))
    cy.get("[data-cy='loginButton']").click()
    cy.url().should('eq','https://frontendbootcamp.proshore.eu/tracker')
  })
