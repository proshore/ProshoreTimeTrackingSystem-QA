/// <reference types="cypress" />

import login_PO from "../../page_objects/ProshoreloginPO/login_PO";
import adminPortalPO from "../../page_objects/ProshoreloginPO/adminPortal_PO";
import { getRandomString , getRandomEmail} from "../../../utilites/helper";



describe('Verify the login functionality of Proshore Login Page', function(){

    //PREPARE
    beforeEach(function(){
        login_PO.visitLoginPage()
    })


    it('Login with empty email address and empty password', function(){
        login_PO.clickLoginButton();
        login_PO.elements.loginbtn().should('be.disabled')
    })


    it('Login with empty email address and any password', function() {
        const loginPassword = getRandomString(10)
        login_PO.typePassword(loginPassword)
        login_PO.elements.loginbtn().should('be.disabled')
    })


    it('Login with any email address and empty password', function() {
        const loginEmail = getRandomEmail()
        login_PO.typeEmail(loginEmail)
        login_PO.elements.loginbtn().should('be.disabled')
    })


    it.only('Login with invalid email address and valid password', function(){
        const loginEmail = getRandomEmail()
        login_PO.typeEmail(loginEmail)
        login_PO.typePassword(Cypress.env('proshoreLoginPassword'))
        login_PO.clickLoginButton()
        login_PO.elements.loginError().should('have.text', 'Please enter valid email or password.')
    })


    it('Login with valid email address and invalid password', function() {
        login_PO.typeEmail(Cypress.env('proshoreLoginEmail'))
        const loginPassword = getRandomString(10)
        login_PO.typePassword(loginPassword)
        login_PO.clickLoginButton()
        login_PO.elements.loginError().should('have.text', 'Please enter valid email or password.')
    })


    it('Login with email address including special symbols along with @', function() {
        login_PO.typeEmail('kritika#$@gmail.com')
        const loginPassword = getRandomString(10)
        login_PO.typePassword(loginPassword)
        login_PO.clickLoginButton()
        login_PO.elements.validationError(0).should('have.text', 'Please enter an valid email.')
    })


    it('Login with password having less than 6 characters', function(){
        const loginEmail = getRandomEmail()
        login_PO.typeEmail(loginEmail)
        const loginPassword = getRandomString(3)
        login_PO.typePassword(loginPassword)
        login_PO.clickLoginButton()
        login_PO.elements.validationError(0).should('have.text', 'Password length must be at least 6 characters.')
    })


    it('Login with email having special characters and password less than 6 characters', function(){
        login_PO.typeEmail('kritika#$@gmail.com')
        const loginPassword = getRandomString(3)
        login_PO.typePassword(loginPassword)
        login_PO.clickLoginButton()
        login_PO.elements.validationError(0).should('have.text', 'Please enter an valid email.')
        login_PO.elements.validationError(1).should('have.text', 'Password length must be at least 6 characters.')
    })


    it('Login with valid email address and valid password', function(){
        cy.login()
        adminPortalPO.elements.title().should('have.text', 'Time Tracker')
    })

    it('Access admin portal via URL', function(){
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
        cy.location('origin').then(URL => {
        expect(URL).to.eq('https://frontendbootcamp.proshore.eu')
        cy.visit(URL + '/tracker')
        cy.get('.form-heading-title').should('have.text', 'Log in')
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login?next=/tracker')
        })
    })

     
    it('Logout from admin portal', function(){
        cy.login()
        cy.get("[data-cy='accountLogoutButton']").click()
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
    })

})