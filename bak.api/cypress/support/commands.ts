/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add(
    'login',
    (
        loginValues: { username: string; password: string },
        failOnStatusCode: boolean
    ) => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3030/api/auth/login',
            failOnStatusCode: failOnStatusCode,
            body: loginValues,
        }).as('loginRequest');
    }
);

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//     namespace Cypress {
//         interface Chainable {
//             login(email: string, password: string): Chainable<void>;
//             //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//             //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//             //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//         }
//     }
// }
