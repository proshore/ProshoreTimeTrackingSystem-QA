/// <reference types="cypress" />

import addNewMemberFunctionPO from "../../page_objects/teamsModulePO/teamsModule_PO"
import { getRandomString , getRandomEmail} from "../../../utilites/helper";

describe('Verifying Add New Member functionality of teams module', function() {

    beforeEach(function() {  
        //Login with valid email address and valid password 
        cy.login()

        //Go to teams module
        cy.get('li a span.link-text').eq(2).contains('Teams').click()
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/teams')
     })

    it('Click Send Invite with empty fields', function(){
        addNewMemberFunctionPO.clickAddNewMember()
        addNewMemberFunctionPO.clickSendInvite()
        addNewMemberFunctionPO.verifyEmptyValidation('name')
    })

    it('Click Send Invite with empty Full Name field and valid Email Address', function(){
        addNewMemberFunctionPO.clickAddNewMember()
        const randomGeneratedEmail = getRandomEmail()
        addNewMemberFunctionPO.typeEmaiAddress(randomGeneratedEmail)
        addNewMemberFunctionPO.clickSendInvite()
        addNewMemberFunctionPO.verifyEmptyValidation('name')
    })

    it('Click Send Invite with Full Name and empty Email Address field.', function(){
        addNewMemberFunctionPO.clickAddNewMember()
        const randomGeneratedName = getRandomString(10)
        addNewMemberFunctionPO.typeFullName(randomGeneratedName)
        addNewMemberFunctionPO.clickSendInvite()
        addNewMemberFunctionPO.verifyEmptyValidation('email')
    })

    it('Click Send Invite with Full Name and Email Address field but empty Roles field.', function(){
        addNewMemberFunctionPO.clickAddNewMember()
        const randomGeneratedName = getRandomString(10)
        addNewMemberFunctionPO.typeFullName(randomGeneratedName)
        const randomGeneratedEmail = getRandomEmail()
        addNewMemberFunctionPO.typeEmaiAddress(randomGeneratedEmail)
        addNewMemberFunctionPO.clickSendInvite()
        addNewMemberFunctionPO.verifyEmptyValidationInRolesField()

    })

    it('Send invite with full name, valid email and roles', function(){
        addNewMemberFunctionPO.clickAddNewMember()
        const randomGeneratedName = getRandomString(10)
        const randomGeneratedEmail = getRandomEmail()
        addNewMemberFunctionPO.typeFullName(randomGeneratedName)
        addNewMemberFunctionPO.typeEmaiAddress(randomGeneratedEmail)
        addNewMemberFunctionPO.typeRoles('MEMBER')
        addNewMemberFunctionPO.clickSendInvite()
        cy.intercept('GET', '/api/invite/invited-users').as('loadInvitedMembers')
        cy.wait('@loadInvitedMembers')

        //Check if the invited members are included in the list
        cy.get('tbody').eq(0).find('tr').first().find('td.gray-color').contains(randomGeneratedEmail)
    })

    it('Revoke functionality of newly invited member', function(){
        //Add New Member
        addNewMemberFunctionPO.clickAddNewMember()   
        //Create new project
        const randomGeneratedName = getRandomString(10)
        const randomGeneratedEmail = getRandomEmail()
        addNewMemberFunctionPO.typeFullName(randomGeneratedName)
        addNewMemberFunctionPO.typeEmaiAddress(randomGeneratedEmail)
        addNewMemberFunctionPO.typeRoles('MEMBER')
        addNewMemberFunctionPO.clickSendInvite()
        cy.intercept('GET', '/api/**').as('loadInvitedMembers')
        cy.wait('@loadInvitedMembers')
        cy.get('tbody').eq(0).find('tr').first().find('td.gray-color').contains(randomGeneratedEmail)
        //Use of revoke functionality
        cy.get('tbody').eq(0).find('tr').first().find('td>#dropdownMenuButton1').click().siblings('ul').contains('Revoke').click()
        cy.intercept('GET', '/api/**').as('loadInvitedMembers')
        cy.wait('@loadInvitedMembers')
        cy.get('tbody').eq(0).find('tr').first().should('not.contain', randomGeneratedEmail)
    })

    it('Reinvite functionality of newly invited member', function(){
        //Add New Member
        addNewMemberFunctionPO.clickAddNewMember()
    
        //Create new project
        const randomGeneratedName = getRandomString(10)
        const randomGeneratedEmail = getRandomEmail()
        addNewMemberFunctionPO.typeFullName(randomGeneratedName)
        addNewMemberFunctionPO.typeEmaiAddress(randomGeneratedEmail)
        addNewMemberFunctionPO.typeRoles('MEMBER')
        addNewMemberFunctionPO.clickSendInvite()
    
        //Use of reinvite functionality
        cy.get('tbody').eq(0).find('tr').first().find('td>.btn').contains('Reinvite').click()
        cy.get('.alert-success').contains('User re-invited successfully')
    })

    it('Number of invited members in the invitation list.', function(){
        cy.get('.fs-5').eq(0).find('span').invoke('text').then((invitedMembersCount) => {
            const invitedListedMembersCount = invitedMembersCount.match(/[0-9]+/g)
            cy.log(invitedListedMembersCount)
            cy.get('.table').eq(0).find('tbody>tr').should('have.length', invitedListedMembersCount)
        })
    })

    it('Use of registered email address for inviting new member.', function(){
        
        cy.intercept('GET', '/api/**').as('loadInvitedMembers')
        cy.wait('@loadInvitedMembers')
        //Get any one of the registered member from AllMember list
        cy.get('tbody').eq(1).find('tr').eq(0).find('td').eq(0).invoke('text').then(name => {
            addNewMemberFunctionPO.clickAddNewMember()
            addNewMemberFunctionPO.typeFullName(name)
        })
        cy.get('tbody').eq(1).find('tr').eq(0).find('td').eq(1).invoke('text').then(email => {
            addNewMemberFunctionPO.clickAddNewMember()
            addNewMemberFunctionPO.typeEmaiAddress(email)
        })
        addNewMemberFunctionPO.typeRoles('MEMBER')
        addNewMemberFunctionPO.clickSendInvite()
        cy.get('div .alert-message').contains('Something went wrong, please try again later.')
    })

    it('Number of registered members in All Members section.', function(){
        cy.get('.fs-5').eq(1).find('span').invoke('text').then((allMembersCount) => {
            const allListedMembersCount = allMembersCount.match(/[0-9]+/g)
            cy.log(allListedMembersCount)
            cy.get('.table').eq(1).find('tbody>tr').should('have.length', allListedMembersCount)
        })
    })

    it.skip('Delete functionality of a registered member.', function(){
        cy.get('.table').eq(1).find('tbody>tr').last().find('td>.btn').eq(1).click().siblings('ul').contains('Delete').click();
        cy.get('.modal-footer').first().find('[data-cy="deleteRegisteredUserSuccessfully"]').contains('Delete').click()
        cy.get('.table').eq(1).find('tbody>tr').last().should('not.exist')
    })
})