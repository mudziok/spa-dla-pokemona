describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('showing error after wrong user login', () => {
    cy.get('[data-test-id="login"]').type('remek@wp.pl1');
    cy.get('[data-test-id="password"]').type('1234');
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="login-error"]').contains(
      'Invalid identifier or password'
    );
  });

  it('showing error after wrong user password', () => {
    cy.get('[data-test-id="login"]').type('remek@wp.pl');
    cy.get('[data-test-id="password"]').type('4321');
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="login-error"]').contains(
      'Invalid identifier or password'
    );
  });

  it('navigate to pokemons page after correct login', () => {
    cy.get('[data-test-id="login"]').type('werka@wp.pl');
    cy.get('[data-test-id="password"]').type('Test1234');
    cy.get('[data-test-id="login-button"]').click();
    cy.url().should('contain', '/pokemons');
    cy.get('[data-test-id="catch-button"]').contains('Złap pokemona');
  });
});
