import {RoutePaths} from "../../../src/shared/appLinks/RoutePaths";

describe('Language Switcher Functionality', () => {
    const localHost = Cypress.env('LOCAL_HOST');
    const languages = Cypress.env('LANGUAGES');

    const languageTexts = {
        [languages.en]: 'Read more',
        [languages.ru]: 'Подробнее',
        [languages.fi]: 'Lue lisää'
    };

    beforeEach(() => {
        cy.visit(`${localHost}${RoutePaths.MAIN}`);
        cy.get('[data-testid="language-switcher"]').as('langSelector');
    });

    function checkLanguage(langCode, expectedText) {
        cy.get('@langSelector').select(langCode, { force: true });
        cy.contains(expectedText).should('be.visible');
        cy.url().should('include', `/${langCode}`);
    }


    it('should change the interface language', () => {
        cy.contains(languageTexts[languages.en]).should('be.visible');
        cy.url().should('include', `/${languages.en}`);

        Object.entries(languageTexts).forEach(([langCode, expectedText]) => {
            checkLanguage(langCode, expectedText);
        });
    });
});

