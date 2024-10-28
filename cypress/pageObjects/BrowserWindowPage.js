class BrowserWindowPage {
    constructor() {
      this.baseUrl = 'https://demoqa.com';
      this.alertsFrameWindowsSelector = 'div.category-cards > div.card.mt-4.top-card';
      this.browserWindowsSelector = 'div.left-pannel > div.accordion > div.element-group';
      this.newWindowButton = '#windowButton';
    }
  
    visitHomePage() {
      cy.visit(this.baseUrl);
    }
  
    selectAlertsFrameWindows() {
      cy.get(this.alertsFrameWindowsSelector).contains('Alerts, Frame & Windows').click();
    }
  
    selectBrowserWindows() {
      cy.get(this.browserWindowsSelector).contains('Browser Windows').click();
    }
  
    clickCloseNewWindowButton() {
      cy.visit('https://demoqa.com/browser-windows').then((win) => {
        cy.spy(win, 'open').as('open');
      });
      cy.get('#windowButton').click()
      cy.get('@open')
        .should('have.been.calledWith', '/sample', '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400')
        .its('firstCall.returnValue')
        .invoke('close')

    }
  
    verifySamplePageMessage() {
      cy.visit('https://demoqa.com/sample').contains('This is a sample page');
      cy.go(-1)
    }
  
  }
  
  export default new BrowserWindowPage();
  