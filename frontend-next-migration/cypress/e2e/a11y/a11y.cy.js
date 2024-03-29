import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('Auth Login', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    beforeEach(() => {
        cy.visit(`${localHost}${RoutePaths.auth_login}`);
        cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y();
    });

});
