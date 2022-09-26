class adminPortalPO {
    elements = {
        title: () => cy.get('h1.fw-bolder')
    }
}

module.exports = new adminPortalPO();