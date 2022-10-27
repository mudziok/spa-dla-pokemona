describe('register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('showing error when email is wrong', () => {
    cy.get('[data-test-id="registration-login"]').type('remek@wp.pl1');
    cy.get('[data-test-id="registration-password"]').type('1');
    cy.get('[data-test-id="registration-button"]').click();
    cy.get('[data-test-id="register-error"]').contains(
      'email must be a valid email'
    );
  });

  it('showing error after wrong user password', () => {
    cy.get('[data-test-id="registration-login"]').type('werka@wp.pl');
    cy.get('[data-test-id="registration-password"]').type('1');
    cy.get('[data-test-id="registration-button"]').click();
    cy.url().should('contain', '/');
    cy.get('[data-test-id="register-error"]').contains(
      'password must be at least 6 characters'
    );
  });

  it('navigate to login page after correct register', () => {
    cy.get('[data-test-id="registration-login"]').type('werka@wp.pl');
    cy.get('[data-test-id="registration-password"]').type('Test1234');
    cy.get('[data-test-id="registration-button"]').click();
    cy.get('[data-test-id="login-button"]').contains('Log in');
  });
});
