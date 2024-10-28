class ApiPage {
  constructor() {
    this.baseUrl = 'https://demoqa.com/Account/v1';
    this.bookStoreUrl = 'https://demoqa.com/BookStore/v1';
    this.username = `user_${Date.now()}`;
    this.password = 'Password123!';
    this.userID = null;
    this.token = null;
    this.books = [];
    this.bookIsbns = [];
  }

  getAuthHeaders() {
    return { Authorization: `Bearer ${this.token}` };
  }

  createUser() {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/User`,
      body: {
        userName: this.username,
        password: this.password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.username).to.eq(this.username);
      this.userID = response.body.userID;
    });
  }

  generateToken() {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/GenerateToken`,
      body: {
        userName: this.username,
        password: this.password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200);
      this.token = response.body.token;
    });
  }

  checkUserAuthorization() {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/Authorized`,
      body: {
        userName: this.username,
        password: this.password
      },
      headers: this.getAuthHeaders(),
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  }

  listAvailableBooks() {
    return cy.request({
      method: 'GET',
      url: `${this.bookStoreUrl}/Books`,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200);
      this.books = response.body.books;
      expect(this.books).to.have.length.greaterThan(1);
      this.bookIsbns = [this.books[0].isbn, this.books[1].isbn];
    });
  }

  reserveBook(isbn) {
    return cy.request({
      method: 'POST',
      url: `${this.bookStoreUrl}/Books`,
      headers: this.getAuthHeaders(),
      body: {
        userId: this.userID,
        collectionOfIsbns: [{ isbn }]
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(201);
    });
  }

  reserveBooks() {
    this.bookIsbns.forEach(isbn => this.reserveBook(isbn));
  }

  listUserDetails() {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/User/${this.userID}`,
      headers: this.getAuthHeaders(),
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('books').that.is.an('array').with.lengthOf(this.bookIsbns.length);
      this.bookIsbns.forEach((isbn, index) => {
        expect(response.body.books[index].isbn).to.eq(isbn);
      });
    });
  }
}

export default new ApiPage();
