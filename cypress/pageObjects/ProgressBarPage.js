class ProgressBarPage {
  constructor() {
    // Selectors
    this.selectors = {
      widgets: 'div.category-cards > div.card.mt-4.top-card',
      progressBarMenu: 'div.left-pannel > div.accordion > div.element-group',
      startStopButton: '#startStopButton',
      resetButton: '#resetButton',
      progressBar: 'div.progress-bar',
      completedProgress: 'div.bg-success',
    };
  }

  visitHomePage() {
    cy.visit('https://demoqa.com/');
  }

  navigateToWidgets() {
    cy.get(this.selectors.widgets).contains('Widgets').click();
  }

  selectProgressBar() {
    cy.get(this.selectors.progressBarMenu).contains('Progress Bar').click();
  }

  startProgressBar() {
    cy.get(this.selectors.startStopButton).click();
  }

  stopProgressBarAt25 = () => {
    cy.get(this.selectors.progressBar)
      .invoke('attr', 'aria-valuenow')
      .then((value) => {
        const progress = parseInt(value);

        if (progress >= 24) {
          // Stop before get to 25%
          cy.get(this.selectors.startStopButton).click();
        } else {
          // Waits 0.1 second and call verification again
          cy.wait(100).then(this.stopProgressBarAt25);
        }
      });
  };

  validateProgress(maxValue) {
    cy.get(this.selectors.progressBar)
      .invoke('attr', 'aria-valuenow')
      .then((value) => {
        const progress = parseInt(value);
        expect(progress).to.be.lte(maxValue);
      });
  }

  resumeProgressBar() {
    cy.get(this.selectors.startStopButton).click();
  }

  waitForCompletion() {
    cy.get(this.selectors.completedProgress, { timeout: 15000 }).should('have.attr', 'aria-valuenow', '100');
  }

  resetProgressBar() {
    cy.get(this.selectors.resetButton).click();
  }
}

export default new ProgressBarPage();