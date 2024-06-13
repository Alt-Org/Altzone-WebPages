describe('Scroll-top Functionality', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    beforeEach(() => {
        cy.visit(`${localHost}`);
        cy.get('[data-testid="scroll-to-top-btn"]').as('scrollTopBtn');
    });

    it('should display the scroll-top button upon scrolling down and scroll to the top when clicked', () => {
        cy.get('@scrollTopBtn').should('not.be.visible');

        cy.scrollTo(0, 500);

        cy.get('@scrollTopBtn').should('be.visible');

        cy.get('@scrollTopBtn').click();

        cy.window().its('scrollY').should('equal', 0);

        cy.get('@scrollTopBtn').should('not.be.visible');

    });
});
