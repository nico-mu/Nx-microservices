describe('Register', () => {
  beforeEach(() => cy.visit('/register'));

  it('should display a register page', () => {
    cy.get('h1').contains('Register');
  });

  it('should register a user', () => {
    cy.register('admin@mail.com', 'admin', 'admin', 'admin');
    cy.url().should('include', '/');
  });
});
