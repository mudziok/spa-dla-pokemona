describe('pokemon list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-test-id="login"]').type('werka@wp.pl');
    cy.get('[data-test-id="password"]').type('Test1234');
    cy.get('[data-test-id="login-button"]').click();
    cy.url().should('contain', '/pokemons');
    cy.get('[data-test-id="catch-button"]').contains('Złap pokemona');
  });

  it('click on button should redirect to list with pokemons', () => {
    cy.get('[data-test-id="catch-button"]').click();
    cy.url().should('contain', '/catch');
    cy.get('[data-test-id="catch-pokemon-button"]').contains('Złap pokemona');
    cy.contains('[data-test-id="test-list-id"]', 'BULBASAUR');

    cy.contains('CATERPIE').click();
    cy.get('[data-test-id="pokemon-name"]').type('Bug');
    cy.get('[data-test-id="pokemon-date"]').type('2022-09-29');
    cy.get('[data-test-id="pokemon-time"]').type('14:20');
    cy.get('[data-test-id="catch-pokemon-button"]').click();
    cy.wait(3000);
    cy.url().should('contain', '/pokemons');
    cy.contains('Bug');
  });
});
