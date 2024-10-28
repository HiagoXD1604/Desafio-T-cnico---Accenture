class WebTablesPage {
  constructor() {
    this.elementsSelector = 'div.category-cards > div.card.mt-4.top-card';
    this.webTablesSelector = 'div.left-pannel > div.accordion > div.element-group';
    this.addNewRecordButton = '#addNewRecordButton';
    this.firstNameInput = '#firstName';
    this.lastNameInput = '#lastName';
    this.userEmailInput = '#userEmail';
    this.ageInput = '#age';
    this.salaryInput = '#salary';
    this.departmentInput = '#department';
    this.submitButton = '#submit';
    this.searchBox = '#searchBox';
    this.editButton = "div.rt-table > div.rt-tbody > div:nth-child(1) > div > div:nth-child(7) > div.action-buttons > span:nth-child(1) > svg";
    this.deleteButton = "div.rt-table > div.rt-tbody > div:nth-child(1) > div > div:nth-child(7) > div.action-buttons > span:nth-child(2) > svg";
  }

  visitHomePage() {
    cy.visit('https://demoqa.com/');
  }

  navigateToElements() {
    cy.get(this.elementsSelector).contains('Elements').click();
  }

  selectWebTables() {
    cy.get(this.webTablesSelector).contains('Web Tables').click();
  }

  fillRecordDetails(firstName, lastName, email, age, salary, department) {
    cy.get(this.firstNameInput).clear().type(firstName);
    cy.get(this.lastNameInput).clear().type(lastName);
    cy.get(this.userEmailInput).clear().type(email);
    cy.get(this.ageInput).clear().type(age);
    cy.get(this.salaryInput).clear().type(salary);
    cy.get(this.departmentInput).clear().type(department);
  }

  createRecord(firstName, lastName, email, age, salary, department) {
    cy.get(this.addNewRecordButton).click();
    this.fillRecordDetails(firstName, lastName, email, age, salary, department);
    cy.get(this.submitButton).click();
  }

  editRecord(updatedFirstName, updatedLastName, updatedEmail, updatedAge, updatedSalary, updatedDepartment) {
    cy.get(this.searchBox).clear().type(updatedFirstName);
    cy.get(this.editButton).click();
    this.fillRecordDetails(updatedFirstName, updatedLastName, updatedEmail, updatedAge, updatedSalary, updatedDepartment);
    cy.get(this.submitButton).click();
  }

  deleteRecord(firstName) {
    cy.get(this.searchBox).clear().type(firstName);
    cy.get(this.deleteButton).click();
  }

  createMultipleRecords(recordCount) {
    for (let i = 1; i <= recordCount; i++) {
      this.createRecord(
        `User${i}`,
        `Last${i}`,
        `user${i}@example.com`,
        `${20 + i}`,
        `${2500 + i * 100}`,
        `Department${i}`
      );
    }
  }

  deleteAllRecords(recordCount) {
    for (let i = 1; i <= recordCount; i++) {
      this.deleteRecord(`User${i}`);
    }
  }
}

export default new WebTablesPage();