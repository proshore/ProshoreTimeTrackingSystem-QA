class addProject_PO {
  elements = {
    projectInput: () => cy.get('[data-cy="addProjectname"]'),
    clientInput: () => cy.get('[data-cy="selectClient"]').select("Jane Doe"),
    createBtn: () => cy.get('[data-cy="newProjectCreateButton"]'),
  };
  visitProjectModulePage() {
    cy.get('[data-cy="projectsSidebarButton"]').contains("Projects").click();
  }
  projectInput(project) {
    this.elements.projectInput().type(project);
  }
  clientInput() {
    this.elements.clientInput().select("Jane Doe");
  }
  createProject() {
    this.elements.createBtn().click({ force: true });
  }
}
module.exports = new addProject_PO();
