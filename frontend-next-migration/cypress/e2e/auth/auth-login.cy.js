import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('Auth Login', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    beforeEach(() => {
        cy.visit(`${localHost}${RoutePaths.auth_login}`);
    });

    it('validates username can only contain letters and numbers', () => {
        cy.get('input[name="username"]').type('!@#$%^');
        cy.get('input[name="password"]').type('validPassword123');
        cy.get('form').submit();
        cy.contains('Username can only contain letters and numbers').should('be.visible');
    });


    it('validates username must be at least 3 characters long', () => {
        cy.get('input[name="username"]').type('a'.repeat(2));
        cy.get('input[name="password"]').type('validPassword123');
        cy.get('form').submit();
        cy.contains('Username must be at least 3 characters long').should('be.visible');
    });


    it('validates username must be at most 15 characters long', () => {
        cy.get('input[name="username"]').type('a'.repeat(16));
        cy.get('input[name="password"]').type('validPassword123');
        cy.get('form').submit();
        cy.contains('Username must be at most 15 characters long').should('be.visible');
    });

    it('validates password must be at most 30 characters long', () => {
        cy.get('input[name="username"]').type('validUsername');
        cy.get('input[name="password"]').type('a'.repeat(31));
        cy.get('form').submit();
        cy.contains('Password must be at most 30 characters long').should('be.visible');
    });

    it('validates password must be at least 6 characters long', () => {
        cy.get('input[name="username"]').type('validUsername');
        cy.get('input[name="password"]').type('12345');
        cy.get('form').submit();
        cy.contains('Password must be at least 6 characters long').should('be.visible');
    });


    it('validates username is required after being cleared', () => {
        cy.get('input[name="username"]').type('validUsername');
        cy.get('input[name="password"]').type('validPassword123');

        cy.get('form').submit();

        cy.get('input[name="username"]').clear();

        cy.get('form').submit();

        cy.contains('Enter your username').should('be.visible');
    });

});
