/// <reference types= "cypress" />

import addProjectPO from "../../page_objects/projectsModulePO/addProject_PO"
import { getRandomString , getRandomEmail} from "../../../utilites/helper";

describe('Verifying Add Project functionality of projects module', function(){

    beforeEach(function(){
        cy.login()  
        addProjectPO.goToProjectModule()
    })

    it('Verifying the action of project registration with empty fields', function(){
        addProjectPO.clickAddProjectButton()
        addProjectPO.verifyEmptyValidation('project')
    })

    it('Create new project client name but empty Project Name.', function(){
        addProjectPO.selectClientName('Jane Doe')
        addProjectPO.clickAddProjectButton()
        addProjectPO.verifyEmptyValidation('project')
    })

    it('Create new project with Project name but empty Client name.', function(){
        const randomGeneratedName = getRandomString(10)
        addProjectPO.typeProjectName(randomGeneratedName)
        addProjectPO.clickAddProjectButton()
        addProjectPO.verifyEmptyValidation('client')
    })

    it('Billable button functionality on create new project', function(){
        addProjectPO.checkbillableKeyFunctionality()
    })

})