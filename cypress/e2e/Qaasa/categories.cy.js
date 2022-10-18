/// <reference types="cypress" />

import { getRandomString} from "../../../utilites/helper";

describe('CRUD test specs for ashishakya.qaasaa.nl', function(){
    beforeEach(function() {
        cy.visit('https://ashishakya.qaasaa.nl/app');
    })

    it('Login to the website', function(){
        cy.get('#email').type(Cypress.env('qaasaUsername'))
        cy.get('#password').type(Cypress.env('qaasaPassword'))
        cy.get('[type="submit"]').contains('Login').click()
        cy.url().should('eq', 'https://ashishakya.qaasaa.nl/app/home#/')
    })

    it('Create New Categories with empty field', function(){
        cy.get('#email').type(Cypress.env('qaasaUsername'))
        cy.get('#password').type(Cypress.env('qaasaPassword'))
        cy.get('[type="submit"]').contains('Login').click()
        cy.url().should('eq', 'https://ashishakya.qaasaa.nl/app/home#/')
        cy.get('.mobile-menu-trigger').eq(0).click()
        cy.get('.sidebar nav li').last().contains('Instellingen').click()
        cy.get('.card-tab li').eq(-2).click()
        cy.get('.card-body .col-auto').click()
        cy.get('.side-panel-footer .form-action button').first().click()
        cy.get('.side-panel-body .form-group>span').invoke('text').should('eq', 'Het name veld is verplicht.')
    })

    it('Create new category name with category name given', function(){
        const categoryName = getRandomString(8)
        cy.get('#email').type(Cypress.env('qaasaUsername'))
        cy.get('#password').type(Cypress.env('qaasaPassword'))
        cy.get('[type="submit"]').contains('Login').click()
        cy.url().should('eq', 'https://ashishakya.qaasaa.nl/app/home#/')
        cy.get('.mobile-menu-trigger').eq(0).click()
        cy.get('.sidebar nav li').last().contains('Instellingen').click()
        cy.get('.card-tab li').eq(-2).click()
        cy.get('.card-body .col-auto').click()
        cy.get('.form-group > .form-control').type(categoryName)
        cy.get('.side-panel-footer .form-action button').first().click()
        cy.get('.table tbody tr').first().should('contain', categoryName)
    })

    it.only('Verifying uniqueness of the catergory', function(){
        const categoryName = getRandomString(8)
        cy.get('#email').type(Cypress.env('qaasaUsername'))
        cy.get('#password').type(Cypress.env('qaasaPassword'))
        cy.get('[type="submit"]').contains('Login').click()
        cy.url().should('eq', 'https://ashishakya.qaasaa.nl/app/home#/')
        cy.get('.mobile-menu-trigger').eq(0).click()
        cy.get('.sidebar nav li').last().contains('Instellingen').click()
        cy.get('.card-tab li').eq(-2).click()
        cy.get('.card-body .col-auto').click()
        cy.get('.form-group > .form-control').type(categoryName)
        cy.get('.side-panel-footer .form-action button').first().click()
        cy.get('.table tbody tr').first().should('contain', categoryName)
        cy.get('.card-body .col-auto').click()
        cy.get('.form-group > .form-control').type(categoryName)
        cy.get('.side-panel-footer .form-action button').first().click()
        cy.get('.side-panel-body .form-group>span').invoke('text').should('eq', 'name is al bezet.')
    })


})