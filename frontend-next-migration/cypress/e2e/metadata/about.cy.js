import {readLocalizationFiles} from "../../support/readLocalizationFiles";

describe('Metadata checks', () => {
    let localHost;
    let aboutContent;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');

        readLocalizationFiles(['en', 'fi', 'ru'], 'about').then((content) => {
            aboutContent = content;
        });


    });

    it('correctly sets metadata in English', () => {
        cy.visit(`${localHost}/en/about`);
        cy.title().should('eq', aboutContent.en["head-title"]);
        cy.get('meta[name="description"]').should('have.attr', 'content', aboutContent.en["head-description"]);
        cy.get('meta[name="keywords"]').should('have.attr', 'content', aboutContent.en["head-keywords"]);
    });

    it('correctly sets metadata in Finnish', () => {
        cy.visit(`${localHost}/fi/about`);
        cy.title().should('eq', aboutContent.fi["head-title"]);
        cy.get('meta[name="description"]').should('have.attr', 'content', aboutContent.fi["head-description"]);
        cy.get('meta[name="keywords"]').should('have.attr', 'content', aboutContent.fi["head-keywords"]);
    });

    it('correctly sets metadata in Russian', () => {
        cy.visit(`${localHost}/ru/about`);
        cy.title().should('eq', aboutContent.ru["head-title"]);
        cy.get('meta[name="description"]').should('have.attr', 'content', aboutContent.ru["head-description"]);
        cy.get('meta[name="keywords"]').should('have.attr', 'content', aboutContent.ru["head-keywords"]);
    });

});
