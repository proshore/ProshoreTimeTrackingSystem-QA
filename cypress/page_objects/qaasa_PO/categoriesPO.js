class categoriesPO{
    elements = {
        navigationButton : () => cy.get('.mobile-menu-trigger').eq(0),
        settingOption : () => cy.get('.sidebar nav li').last(),
        categoriesOption : () => cy.get('.card-tab li').eq(-2),
        newCategory : () => cy.get('.col-auto > .btn'),
        categoryName : () => cy.get('.form-group > .form-control'),
        saveButton : () => cy.get('.form-action .btn-primary'),
        validationError : () => cy.get('.form-group .order-5'),
        tableRows : () => cy.get('.table tbody tr')
    }

    clickNavigationButton(){
        this.elements.navigationButton().click()
    }

    goToSettingOption(){
        this.elements.settingOption().contains('Instellingen').click()
    }

    clickCategoriesOption(){
        this.elements.categoriesOption().click()
    }

    goToNewCategory(){
        this.elements.newCategory().click()
    }

    typeCategoryName(categoryName){
        this.elements.categoryName().type(categoryName)
    }

    clickSaveButton(){
        this.elements.saveButton().click()
    }

}

module.exports = new categoriesPO();