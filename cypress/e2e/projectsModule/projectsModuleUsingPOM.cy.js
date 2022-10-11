/// <reference types= "cypress" />

import addProjectPO from "../../page_objects/projectsModulePO/addProject_PO"
import { getRandomString , getRandomEmail} from "../../../utilites/helper";

describe('Verifying Add Project functionality of projects module', function(){

    beforeEach(function(){
        cy.login() 
        addProjectPO.goToProjectModule()
    })
    
    it('Matching searched string from the list if exists', function(){
    //TODOS add a logic of add new project and assert its existence for isolated test
        const searchKeyword = 12345
        cy.waitForComponentToMount()
        addProjectPO.elements.searchField().type(searchKeyword).should('have.value', searchKeyword)
        cy.get('.table tbody tr').should('have.length', 1) 
        cy.get('.table tbody tr').each(($tableRowItem) => {  
            cy.wrap($tableRowItem).find('input').should('have.value', searchKeyword)
            .and('have.attr', 'data-cy', 'projectNameEdit')    
        })
    })   
    
})