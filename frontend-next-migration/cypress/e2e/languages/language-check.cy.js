import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('Language Switcher Functionality', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    beforeEach(() => {
        cy.visit(`${localHost}${RoutePaths.MAIN}`);
        cy.get('[data-testid="language-switcher"]').as('langSelector');
    });

    it('should change the interface language', () => {
        cy.contains('Read more').should('be.visible');
        cy.url().should('include', '/en');

        cy.get('@langSelector').select('ru', { force: true });
        cy.contains('Подробнее').should('be.visible');
        cy.url().should('include', '/ru');

        cy.get('@langSelector').select('fi', { force: true });
        cy.contains('Lue lisää').should('be.visible');
        cy.url().should('include', '/fi');

        cy.get('@langSelector').select('en', { force: true });
        cy.contains('Read more').should('be.visible');
        cy.url().should('include', '/en');
    });
});

