import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('Navigation', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');

        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('NEXT_NOT_FOUND')) {
                return false;
            }
        });
    });

    it('should navigate to the Clan All page', () => {
        cy.visit(`${localHost}/`);
        cy.get('nav').find(`a[href*="${RoutePaths.clan_all}"]`).click({ force: true });
        cy.url().should('include', RoutePaths.clan_all);
        cy.contains('All clans');
    });

    it('should navigate to the Members page', () => {
        cy.visit(`${localHost}/`);
        cy.get('nav').find(`a[href*="${RoutePaths.MEMBERS}"]`).click({ force: true });
        cy.url().should('include', RoutePaths.MEMBERS);
        cy.contains('Game design');
    });

    it('should handle Not Found page', () => {
        cy.visit(`${localHost}${RoutePaths.NOT_FOUND}`, { failOnStatusCode: false });
        cy.url().should('include', RoutePaths.NOT_FOUND);
        cy.contains('404');
    });

    it('should navigate to the Picture Gallery page', () => {
        cy.visit(`${localHost}/`);
        cy.get('nav').find(`a[href*="${RoutePaths.PICTURE_GALLERY}"]`).click({ force: true });
        cy.url().should('include', RoutePaths.PICTURE_GALLERY);
        cy.contains('Galleries');
    });

    it('should navigate to the Comics Gallery page', () => {
        cy.visit(`${localHost}/`);
        cy.get('nav').find(`a[href*="${RoutePaths.COMICS_GALLERY}"]`).click({ force: true });
        cy.url().should('include', RoutePaths.COMICS_GALLERY);
        cy.contains('Comics');
    });

    it('should navigate to the main page when clicking on the logo image', () => {
        cy.visit(`${localHost}/${RoutePaths.COMICS_GALLERY}`);
        cy.get('nav').find('img[alt="main"]').parent('a').click();
        cy.url().should('include', `${localHost}/`);
    });

    it('should navigate to the auth login and go to auth register', () => {
        cy.visit(`${localHost}/`);
        cy.get('nav').find(`a[href*="${RoutePaths.auth_login}"]`).click({ force: true });
        cy.url().should('include', RoutePaths.auth_login);
        cy.get('h1').contains('Log In');

        cy.get(`a[href*="${RoutePaths.auth_register}"]`).click();
        cy.url().should('include', RoutePaths.auth_register);
        cy.get('h1').contains('Register');
    });

});
