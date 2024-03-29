import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('About a11y', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    beforeEach(() => {
        cy.visit(`${localHost}${RoutePaths.ABOUT}`);
        cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y();
    });

});
