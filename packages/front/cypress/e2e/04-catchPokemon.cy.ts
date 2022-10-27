describe('catch pokemon', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-test-id="login"]').type('werka@wp.pl');
    cy.get('[data-test-id="password"]').type('Test1234');
    cy.get('[data-test-id="login-button"]').click();
    cy.url().should('contain', '/pokemons');
    cy.get('[data-test-id="catch-button"]').contains('Złap pokemona');
  });

  it('catch pokemon', () => {
    cy.get('[data-test-id="catch-button"]').click();
    cy.url().should('contain', '/catch');
    cy.get('[data-test-id="catch-pokemon-button"]').contains('Złap pokemona');
    cy.contains('[data-test-id="test-list-id"]', 'Bulbasaur', {
      matchCase: false,
    });
    cy.contains('Caterpie', { matchCase: false }).click();
    cy.get('[data-test-id="pokemon-name"]').type('Bug');
    cy.get('[data-test-id="pokemon-date"]').type('2022-09-29');
    cy.get('[data-test-id="pokemon-time"]').type('14:20');
    cy.get('[data-test-id="catch-pokemon-button"]').click();
    cy.url().should('contain', '/pokemons');
    cy.contains('Bug', { matchCase: false });
  });

  it('delete pokemon', () => {
    cy.contains('Bug', { matchCase: false }).click();
    cy.contains('Bug', { matchCase: false }).should('not.exist');
  });

  it.only('catch 2 pokemons', () => {
    cy.get('[data-test-id="catch-button"]').click();
    cy.url().should('contain', '/catch');
    cy.get('[data-test-id="catch-pokemon-button"]').contains('Złap pokemona');
    cy.contains('[data-test-id="test-list-id"]', 'Bulbasaur', {
      matchCase: false,
    });

    //catch first pokemon
    cy.contains('Bulbasaur', { matchCase: false }).click();
    cy.get('[data-test-id="pokemon-name"]').type('Bulba');
    cy.get('[data-test-id="pokemon-date"]').type('2022-09-29');
    cy.get('[data-test-id="pokemon-time"]').type('14:20');
    cy.get('[data-test-id="catch-pokemon-button"]').click();

    //check if first pokemon is caught
    cy.url().should('contain', '/pokemons');
    cy.contains('Bulba', { matchCase: false });

    //catch second pokemon
    cy.get('[data-test-id="catch-button"]').click();
    cy.url().should('contain', '/catch');
    cy.get('[data-test-id="catch-pokemon-button"]').contains('Złap pokemona');
    cy.contains('[data-test-id="test-list-id"]', 'Pikachu', {
      matchCase: false,
    });
    cy.contains('Pikachu', { matchCase: false }).click();
    cy.get('[data-test-id="pokemon-name"]').type('Pika pika');
    cy.get('[data-test-id="pokemon-date"]').type('2022-09-29');
    cy.get('[data-test-id="pokemon-time"]').type('14:30');
    cy.get('[data-test-id="catch-pokemon-button"]').click();

    //check if second pokemon is caught
    cy.url().should('contain', '/pokemons');
    cy.contains('Pika pika', { matchCase: false });
  });
});
