import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import BrowserWindowPage from '../../../pageObjects/browserWindowPage';
Given('I am on the DemoQA website', () => {
    cy.blockUnwantedRequests();
    BrowserWindowPage.visitHomePage();
});

When('I choose Alerts, Frame & Windows', () => {
    BrowserWindowPage.selectAlertsFrameWindows();
});

When('I click on Browser Windows', () => {
    BrowserWindowPage.selectBrowserWindows();
});

Then('I click and close the new window', () => {
  BrowserWindowPage.clickCloseNewWindowButton()
});

Then('I should see the message {string}', (message) => {
  BrowserWindowPage.verifySamplePageMessage()
});
