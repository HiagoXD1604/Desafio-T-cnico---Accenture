import { faker } from '@faker-js/faker';

class PracticeFormPage {
  constructor() {
    // Random data
    this.data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number('##########').replace(/\D/g, ''),
      address: faker.address.streetAddress(),
    };
    this.selectors = {
      firstName: '#firstName',
      lastName: '#lastName',
      email: '#userEmail',
      gender: '#genterWrapper .col-md-9',
      phone: '#userNumber',
      hobbies: '#hobbiesWrapper',
      subjects: '#subjectsContainer',
      fileUpload: '#uploadPicture',
      address: '#currentAddress',
      state: '#state',
      city: '#city',
      submit: '#submit',
      modalBody: '.modal-body',
      closeModal: '#closeLargeModal',
      genderOptions: ['Male', 'Female', 'Other'],
      hobbiesOptions: ['Sports', 'Reading', 'Music'],
      states: {
        NCR: ['Delhi', 'Gurgaon', 'Noida'],
        'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
        Haryana: ['Karnal', 'Panipat'],
        Rajasthan: ['Jaipur', 'Jaiselmer'],
      },
    };
  }

  fillOutForm() {
    cy.get(this.selectors.firstName).type(this.data.firstName);
    cy.get(this.selectors.lastName).type(this.data.lastName);
    cy.get(this.selectors.email).type(this.data.email);
    this.selectRandomGender();
    cy.get(this.selectors.phone).type(this.data.phone);
    this.selectRandomHobbies();
    cy.get(this.selectors.subjects).type('Math'); 
    cy.fixture('test.txt', null).as('txt');
    cy.get(this.selectors.fileUpload).selectFile('@txt');
    cy.get(this.selectors.address).type(this.data.address);
    this.selectRandomStateAndCity();
  }

  selectRandomGender() {
    const randomGender = this.getRandomValue(this.selectors.genderOptions);
    this.data.randomGender = randomGender;
    cy.get(this.selectors.gender).contains(randomGender).click();
  }

  selectRandomHobbies() {
    const selectedHobbies = this.getRandomSubset(this.selectors.hobbiesOptions);
    this.data.randomHobbies = selectedHobbies;
    selectedHobbies.forEach((hobby) => {
      cy.get(this.selectors.hobbies).contains(hobby).click();
    });
  }

  selectRandomStateAndCity() {
    const randomState = this.getRandomKey(this.selectors.states);
    const randomCity = this.getRandomValue(this.selectors.states[randomState]);
    this.data.randomState = randomState;
    this.data.randomCity = randomCity;

    cy.get(this.selectors.state).click();
    cy.get(`${this.selectors.state} > div.css-26l3qy-menu`).contains(randomState).click();
    cy.get(this.selectors.city).click();
    cy.get(`${this.selectors.city} > div.css-26l3qy-menu`).contains(randomCity).click();
  }

  submitForm() {
    cy.get(this.selectors.submit).click();
  }

  containsFormValues() {
    cy.get(this.selectors.modalBody).should('contain', this.data.firstName)
      .and('contain', this.data.lastName)
      .and('contain', this.data.email)
      .and('contain', this.data.phone.substring(0, 10))
      .and('contain', this.data.address)
      .and('contain', this.data.randomGender)
      .and('contain', this.data.randomState)
      .and('contain', this.data.randomCity);
      
    this.data.randomHobbies.forEach((hobby) => {
      cy.get(this.selectors.modalBody).should('contain', hobby);
    });
  }

  closeModal() {
    cy.get(this.selectors.closeModal, { timeout: 10000 }).scrollIntoView().click({ force: true });
  }

  getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  getRandomSubset(array) {
    const result = [];
    const count = Math.floor(Math.random() * array.length) + 1;
    while (result.length < count) {
      const item = this.getRandomValue(array);
      if (!result.includes(item)) result.push(item);
    }
    return result;
  }
}

export default new PracticeFormPage();
