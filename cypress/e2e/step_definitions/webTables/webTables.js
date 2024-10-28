import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import WebTablesPage from '../../../pageObjects/WebTablesPage';

Given('I am on the DemoQA website', () => {
  WebTablesPage.visitHomePage();
});

When('I navigate to Elements', () => {
  WebTablesPage.navigateToElements();
});

When('I select Web Tables', () => {
  WebTablesPage.selectWebTables();
});

When('I create a new record', () => {
  WebTablesPage.createRecord('test1', 'test', 'test@example.com', '20', '2500', 'Automation');
});

Then('I edit the new record', () => {
  WebTablesPage.editRecord('test1', 'test1', 'test1@example.com', '25', '3000', 'QA');
});

Then('I delete the new record', () => {
  WebTablesPage.deleteRecord('test1');
});

When('I create 12 new records dynamically', () => {
  WebTablesPage.createMultipleRecords(12);
});

Then('I delete all the newly created records', () => {
  WebTablesPage.deleteAllRecords(12);
});
