import { sortablePage } from '../../../pageObjects/SortablePage';

const orderArray = ["One", "Two", "Three", "Four", "Five", "Six"]; // Defina a ordem desejada aqui

Given("I access the site's home page", () => {
  sortablePage.visit();
});

When('I navigate to the Sortable menu', () => {
  sortablePage.navigateToSortable();
});

When('I arrange the elements in the specified order', () => {
  sortablePage.reorderElements(orderArray);
});

Then('The elements should be in the specified order', () => {
  sortablePage.verifyOrder(orderArray);
});
