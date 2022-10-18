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

    it('Create new category name with category name given', function(){
        const categoryName = getRandomString(8)
        categoriesPO.typeCategoryName(categoryName)
        categoriesPO.clickSaveButton()
        categoriesPO.elements.tableRows().first().should('contain', categoryName)
    })

    it('Verifying uniqueness of the catergory', function(){
        const categoryName = getRandomString(8)
        categoriesPO.typeCategoryName(categoryName)
        categoriesPO.clickSaveButton()
        categoriesPO.elements.tableRows().first().should('contain', categoryName)
        categoriesPO.goToNewCategory()
        categoriesPO.typeCategoryName(categoryName)
        categoriesPO.clickSaveButton()
        categoriesPO.elements.validationError().invoke('text').should('eq', 'name is al bezet.')
    })


})