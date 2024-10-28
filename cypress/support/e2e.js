// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore errors with "Script error." message or containing "cross origin"
    if (err.message.includes('Script error.') || err.message.includes('cross origin')) {
      // Return false to prevent Cypress from failing the test
      return false;
    }
    // Let Cypress throw other errors normally
    throw err;
  });
// Bloqueia requisições para URLs indesejados
Cypress.Commands.add('blockUnwantedRequests', () => {
  cy.intercept('GET', '**/googleadservices.com/**', { statusCode: 204 });
  cy.intercept('GET', '**/pagead2.googlesyndication.com/**', { statusCode: 204 });
  cy.intercept('GET', '**/doubleclick.net/**', { statusCode: 204 });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')