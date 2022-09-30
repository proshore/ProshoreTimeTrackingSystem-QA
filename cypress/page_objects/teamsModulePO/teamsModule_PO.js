class addNewMemberFunctionPO {
    elements = {
        addNewMember : () => cy.get('.teams__container [type="button"]').eq(0),
        fullName : () => cy.get('[data-cy="emailInputField"]').eq(0),
        emailAddress : () => cy.get('[data-cy="emailInputField"]').eq(1),
        roles : () => cy.get('.form-select'), 
        sendInvite : () => cy.get('[type="submit"]')
    }

    visitLoginPage(){
        cy.visit('https://frontendbootcamp.proshore.eu/accounts/login')
        cy.contains('Log in')
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
    }
    
    clickAddNewMember(){
        this.elements.addNewMember().click()
        cy.get('#exampleModalLabel').contains('Add New Member')
    }

    verifyEmptyValidation(fieldName){
        if(fieldName === 'name'){
            this.elements.fullName().invoke('prop', 'validationMessage')
            .should('equal', 'Please fill out this field.')
        }
        if(fieldName === 'email'){
            this.elements.emailAddress().invoke('prop', 'validationMessage')
            .should('equal', 'Please fill out this field.')
        }
    }

    verifyEmptyValidationInRolesField(){
        this.elements.roles().invoke('prop', 'validationMessage')
        .should('equal', 'Please select an item in the list.')
    }

    typeFullName(fullName){
        this.elements.fullName().type(fullName)
    }

    typeEmaiAddress(email){
        this.elements.emailAddress().type(email)
    }

    typeRoles(roles){
        this.elements.roles().select(roles)
    }

    clickSendInvite(){
        this.elements.sendInvite().contains('Send Invite').click({force : true})
    }
};

module.exports = new addNewMemberFunctionPO();