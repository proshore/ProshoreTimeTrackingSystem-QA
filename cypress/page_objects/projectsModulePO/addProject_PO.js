class addProjectPO{
    elements = {
        projectName : () => cy.get('[data-cy="addProjectname"]'),
        clientName : () => cy.get('#client-id'),
        billableKey : () => cy.get('[data-cy="toggleBillable"]'),
        addProject : () => cy.get('[data-cy="newProjectCreateButton"]'),
        validationError : () => cy.get('.alert-message'),
        searchField : () => cy.get('.topnav input')
    }

    goToProjectModule(){
        cy.get('li a span.link-text').eq(1).contains('Projects').click()
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/projects')
    }

    verifyEmptyValidation(name){
        if(name === 'project') {
            this.elements.projectName().invoke('prop', 'validationMessage')
            .should('equal', 'Please fill out this field.') 
        }
        if(name == 'client'){
            this.elements.clientName().invoke('prop', 'validationMessage')
            .should('equal', 'Please select an item in the list.')
        }
    }

    typeProjectName(projectName){
        this.elements.projectName().wait(1000).type(projectName)
    }

    selectClientName(clientName){
        this.elements.clientName().select(clientName)
    }

    checkbillableKeyFunctionality(){
        this.elements.billableKey().should('have.attr', 'title', 'Billable')
        this.elements.billableKey().click().should('have.attr', 'title', 'Non billable')
        this.elements.billableKey().click().should('have.attr', 'title', 'Billable')
    }

    clickAddProjectButton(){
        this.elements.addProject().contains('ADD PROJECT').click()
    }
}

module.exports = new addProjectPO();