describe("Teams module", function () {
    beforeEach(function () {
      cy.login();
      cy.wait(2000)
      cy.teamsModule();
    })
    it("URL should be https://frontendbootcamp.proshore.eu/teams", function () {
        cy.url().should("eq", "https://frontendbootcamp.proshore.eu/teams");
      });

      it("should be ",function(){
        cy.get('.topnav > input')
      })

})