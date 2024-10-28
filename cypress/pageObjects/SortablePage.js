import '@4tw/cypress-drag-drop';

export class SortablePage {
  static elements = {
    interactionsMenu: 'div.category-cards > div.card.mt-4.top-card',
    sortableSubMenu: 'div.accordion > div.element-group',
    listItem: 'div.vertical-list-container > .list-group-item',
    confirmationText: '.text-center'
  };

  visit() {
    cy.visit('https://demoqa.com/');
  }

  navigateToSortable() {
    cy.get(SortablePage.elements.interactionsMenu)
      .contains('Interactions')
      .click();
    cy.get(SortablePage.elements.sortableSubMenu)
      .contains('Sortable')
      .click();
    cy.get(SortablePage.elements.listItem).should('be.visible');
  }

  reorderElements(orderArray) {
    orderArray.forEach((item, index) => {
      const nextItem = orderArray[index + 1];
      if (nextItem) {
        cy.get(`${SortablePage.elements.listItem}:contains("${item}")`)
          .drag(`${SortablePage.elements.listItem}:contains("${nextItem}")`, {
            force: true,
            offset: '20px 20px'
          });
        cy.wait(500);
        this.confirmAction();
      }
    });

    // Last change into Dragables garranties that is sortted
    cy.get(`${SortablePage.elements.listItem}:contains("Five")`)
      .drag(`${SortablePage.elements.listItem}:contains("Six")`, {
        force: true,
        offset: '20px 20px'
      });
    cy.wait(500);
    this.confirmAction();
  }

  confirmAction() {
    cy.get(SortablePage.elements.confirmationText).click();
  }

  verifyOrder(orderArray) {
    cy.get(SortablePage.elements.listItem).then(($els) => {
      const actualOrder = Array.from($els).map($el => $el.innerText);
      expect(actualOrder).to.deep.equal(orderArray);
    });
  }
}

export const sortablePage = new SortablePage();