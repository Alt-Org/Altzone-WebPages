describe('Environment variable set in plugin', () => {
    let localHost;

    before(() => {
        localHost = Cypress.env('LOCAL_HOST');
    });

    it.only('can be accessed within test.', () => {
        cy.log(`LOCAL_HOST is ${localHost}`);

        expect(localHost).to.exist;

        expect(localHost).to.equal('http://localhost:5173');
    });
});
