import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import ProgressBarPage from '../../../pageObjects/ProgressBarPage';

Given('I am on the DemoQA website', () => {
  ProgressBarPage.visitHomePage();
});

When('I navigate to Widgets', () => {
  ProgressBarPage.navigateToWidgets();
});

When('I select Progress Bar', () => {
  ProgressBarPage.selectProgressBar();
});

When('I start the progress bar', () => {
  ProgressBarPage.startProgressBar();
});

Then('I stop it before it reaches 25%', () => {
  ProgressBarPage.stopProgressBarAt25();
});

Then('the progress should be 25% or less', () => {
  ProgressBarPage.validateProgress(25);
});

When('I resume the progress bar', () => {
  ProgressBarPage.resumeProgressBar();
});

Then('I wait until it reaches 100%', () => {
  ProgressBarPage.waitForCompletion();
});

Then('I reset the progress bar', () => {
  ProgressBarPage.resetProgressBar();
});
