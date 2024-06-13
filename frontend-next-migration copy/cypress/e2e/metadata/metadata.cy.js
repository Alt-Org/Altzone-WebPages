import { readLocalizationFiles } from "../../support/readLocalizationFiles";

describe('Metadata checks for about page', () => {
    const localHost = Cypress.env('LOCAL_HOST');
    const languages = ['en', 'fi', 'ru'];
    let aboutContent;

    before(() => {
        readLocalizationFiles(languages, 'about').then((content) => {
            aboutContent = content;
        });
    });

    languages.forEach((lang) => {
        it(`correctly sets metadata in ${lang.toUpperCase()}`, () => {
            cy.visit(`${localHost}/${lang}/about`);
            cy.title().should('eq', aboutContent[lang]["head-title"]);
            cy.get('meta[name="description"]').should('have.attr', 'content', aboutContent[lang]["head-description"]);
            cy.get('meta[name="keywords"]').should('have.attr', 'content', aboutContent[lang]["head-keywords"]);
        });
    });
});
