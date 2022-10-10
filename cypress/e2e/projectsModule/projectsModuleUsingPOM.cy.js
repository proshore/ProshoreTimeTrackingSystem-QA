/// <reference types= "cypress" />

import addProjectPO from "../../page_objects/projectsModulePO/addProject_PO"
import { getRandomString , getRandomEmail} from "../../../utilites/helper";

describe('Verifying Add Project functionality of projects module', function(){

    beforeEach(function(){
        cy.login()  
        addProjectPO.goToProjectModule()
    })

    it('Create new project in projects module with non-empty fields', function() {
        const randomGeneratedName = getRandomString
        addProjectPO.typeProjectName(randomGeneratedName) 
        addProjectPO.selectClientName('Jane Doe')
        addProjectPO.clickAddProjectButton()
    })

})