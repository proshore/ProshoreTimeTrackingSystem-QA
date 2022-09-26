class login_PO {
    elements = {
        emailInput : () => cy.get("[data-cy='emailInputField']").eq(0),
        passwordInput : () => cy.get("[data-cy='emailInputField']").eq(1),
        loginbtn : () => cy.get("[data-cy='loginButton']"),
        loginError : () => cy.get('.alert-message'),
        // emailError : () => cy.get('.text-danger').eq(0),
        // passwordError : () => cy.get('.text-danger').eq(1),
        // passwordErr : () => cy.get('.text-danger'),
        validationError : (index) => cy.get('.text-danger').eq(index)
    }

    visitLoginPage(){
        cy.visit('https://frontendbootcamp.proshore.eu/accounts/login')
        cy.contains('Log in')
        cy.url().should('eq', 'https://frontendbootcamp.proshore.eu/accounts/login')
    }

    typeEmail(email){
        this.elements.emailInput().type(email)
    }

    typePassword(password){
        this.elements.passwordInput().type(password)
    }

    clickLoginButton(){
        this.elements.loginbtn().click({force : true})
    }
};

module.exports = new login_PO();