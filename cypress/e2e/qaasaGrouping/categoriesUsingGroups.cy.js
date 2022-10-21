/// <reference types="cypress" />

import categoriesPO from "../../page_objects/qaasa_PO/categoriesPO"
import { getRandomString} from "../../../utilites/helper";

describe('CRUD test specs for ashishakya.qaasaa.nl', function(){

    beforeEach(function() {
        cy.qaasaLogin();
        categoriesPO.clickNavigationButton()
        categoriesPO.goToSettingOption()
        categoriesPO.clickCategoriesOption()
        categoriesPO.goToNewCategory()
    })

    it('Create New Categories with empty field', function(){
        categoriesPO.clickSaveButton()
        categoriesPO.elements.validationError().invoke('text').should('eq', 'Het name veld is verplicht.')
    })

    context('Creating dependent test: Creating, Searching, Editing and Deleting Categories', function() {

        let categoryName;

        beforeEach(function(){
            categoryName = getRandomString(8)
            categoriesPO.typeCategoryName(categoryName)
            categoriesPO.clickSaveButton()
            categoriesPO.elements.tableRows().first().find('td').eq(1).should('contain', categoryName)
        })

        it('Create new category name with category name given', function(){
            categoriesPO.elements.tableRows().first().find('td').eq(2).then((numberOfSuppliers => {
                cy.wrap(numberOfSuppliers.text().trim()).should('eq', '0')
            }))
        })

        it('Verifying uniqueness of the catergory', function(){
            categoriesPO.goToNewCategory()
            categoriesPO.typeCategoryName(categoryName)
            categoriesPO.clickSaveButton()
            categoriesPO.elements.validationError().invoke('text').should('eq', 'name is al bezet.')
        })

        it('Verifying edit property of the category name', function(){
            const addedCategoryName = getRandomString()
            const updatedCategoryName = categoryName + addedCategoryName
            cy.get('.text-right > .dropdown').first().click()
            cy.get('.text-right > .dropdown > .dropdown-menu >').eq(1).click()
            categoriesPO.elements.categoryName().should('have.value', categoryName)
            categoriesPO.typeCategoryName(addedCategoryName)
            categoriesPO.clickSaveButton()
            categoriesPO.elements.tableRows().first().find('td').eq(1).should('contain', updatedCategoryName)
        })

        it('Testing search action', function(){
            cy.intercept(`/api/supplier-categories?*`).as('tableItems')
            cy.get('.col > .form-control').type(categoryName).type('{enter}')
            cy.wait('@tableItems')
            categoriesPO.elements.tableRows().each(($tableRowItem) => {  
                expect($tableRowItem).to.contain(categoryName);
            })
        })

        it('Test Delete Functionality', function(){
            cy.get('.text-right > .dropdown').first().click()
            cy.get('.text-right > .dropdown > .dropdown-menu >').eq(2).click()
            cy.get('.swal2-container .swal2-actions button').first().contains('Verwijderen').click()
            cy.intercept(`/api/supplier-categories?*`).as('tableItems')
            cy.get('.col > .form-control').type(categoryName).type('{enter}')
            cy.wait('@tableItems')
            categoriesPO.elements.tableRows().should('have.length', 0)
        })
    })

})
