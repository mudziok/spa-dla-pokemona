describe('pokemon list', () => {
  beforeEach(() => {
    cy.get('[data-test-id="login"]').type('remek@wp.pl');
    cy.get('[data-test-id="password"]').type('123456');
    cy.get('[data-test-id="login-button"]').click();
    cy.url().should('contain', '/pokemons');
    cy.get('[data-test-id="catch-button"]').contains('Złap pokemona');
  });

  it('click on button should redirect to list with pokemons', () => {
    cy.get('[data-test-id="catch-button"]').click();
    cy.url().should('contain', '/catch');
    cy.get('[data-test-id="catch-pokemon-button"]').contains('Złap pokemona');
    cy.contains('[data-test-id="test-list-id"]', 'BULBASAUR');
  });
});
