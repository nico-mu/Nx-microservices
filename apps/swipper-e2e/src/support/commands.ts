// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    register(
      email: string,
      username: string,
      password: string,
      confirmPassword: string
    ): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(password);
  cy.get('button[name=loginButton]').click();
  cy.url().should('include', '/');
});

Cypress.Commands.add(
  'register',
  (email, username, password, confirmPassword) => {
    cy.visit('/register');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(confirmPassword);
    cy.get('button[name=registerButton]').click();
    cy.url().should('include', '/');
  }
);
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
