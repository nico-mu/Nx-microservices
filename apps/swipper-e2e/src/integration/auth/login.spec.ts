describe('Login', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display a login page', () => {
    cy.get('h1').contains('Login');
  });

  it('should login a user', () => {
    cy.login('admin@mail.com', 'admin');
    cy.url().should('include', '/');
  });
});
