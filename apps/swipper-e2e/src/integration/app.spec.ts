import { getGreeting } from '../support/app.po';

describe('Login', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display a login page', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('test@mail.com', 'test');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Login');
  });
});
