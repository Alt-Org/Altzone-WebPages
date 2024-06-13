import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('Auth Registration', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    beforeEach(() => {
        cy.visit(`${localHost}${RoutePaths.auth_register}`);
    });

    it('validates username requirements', () => {
        cy.get('input[name="username"]').type('user!#');
        cy.get('form').submit();
        cy.contains('Username can only contain letters and numbers').should('be.visible');

        cy.get('input[name="username"]').clear().type('us');
        cy.get('form').submit();
        cy.contains('Username must be at least 3 characters long').should('be.visible');

        cy.get('input[name="username"]').clear().type('a'.repeat(16));
        cy.get('form').submit();
        cy.contains('Username must be at most 15 characters long').should('be.visible');
    });

    it('validates password complexity', () => {
        cy.get('input[name="password"]').type('123');
        cy.get('form').submit();
        cy.contains('Password must be at least 6 characters long').should('be.visible');

        cy.get('input[name="password"]').clear().type('a'.repeat(31));
        cy.get('form').submit();
        cy.contains('Password must be at most 30 characters long').should('be.visible');
    });

    it('validates password match', () => {
        cy.get('input[name="password"]').type('validPassword123');
        cy.get('input[name="repeatPassword"]').type('differentPassword123');
        cy.get('form').submit();
        cy.contains('Passwords must match').should('be.visible');
    });

    it('validates name is required', () => {
        cy.get('input[name="name"]').clear();
        cy.get('form').submit();
        cy.contains('Name must be at least 3 characters long').should('be.visible');
    });

    it('validates backpack capacity is a number', () => {
        cy.get('input[name="backpackCapacity"]').type('twenty');
        cy.get('form').submit();
        cy.contains('backpackCapacity must be a `number` type').should('be.visible');
    });

});
