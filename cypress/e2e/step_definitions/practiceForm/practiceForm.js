import PracticeFormPage from '../../../pageObjects/PracticeFormPage';

Given('I am on the Practice Form page', () => {
  cy.visit('https://demoqa.com/');
  cy.contains('Forms').click();
  cy.contains('Practice Form').click();
});

When('I fill out the form with random data', () => {
  PracticeFormPage.fillOutForm();
});

When('I submit the form', () => {
  PracticeFormPage.submitForm();
});

Then('I should be able to close the submission modal', () => {
  PracticeFormPage.containsFormValues()
  PracticeFormPage.closeModal();
});
