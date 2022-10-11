class addProjectPO{
    elements = {
        searchField : () => cy.get('.topnav input')
    }

    goToProjectModule(){
        cy.get('li a span.link-text').eq(1).contains('Projects').click()
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/projects')
    }

}

module.exports = new addProjectPO();