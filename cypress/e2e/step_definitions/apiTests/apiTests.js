// cypress/integration/apiTests.js
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import ApiPage from '../../../pageObjects/ApiPage';

Given('I create a user', () => {
  ApiPage.createUser();
});

When('I generate an access token', () => {
  ApiPage.generateToken();
});

When('I check if the user is authorized', () => {
  ApiPage.checkUserAuthorization();
});

When('I list available books', () => {
  ApiPage.listAvailableBooks();
});

When('I reserve two books', () => {
  ApiPage.reserveBooks();
});

Then('I should list the user details with reserved books', () => {
  ApiPage.listUserDetails();
});
