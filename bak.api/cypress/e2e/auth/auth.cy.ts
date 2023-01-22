describe('Auth Controller', () => {
    it('Should login succesfully', () => {
        cy.fixture('auth/login/login').then((json) => {
            cy.login(json, true);
        });

        cy.get('@loginRequest').then((response: any) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Should not login', () => {
        cy.fixture('auth/login/badLogin').then((json) => {
            cy.login(json, false);
        });

        cy.get('@loginRequest').then((response: any) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Should not login', () => {
        cy.fixture('auth/login/loginValidate').then((json) => {
            cy.login(json, false);
        });

        cy.get('@loginRequest').then((response: any) => {
            expect(response.status).to.eq(400);
            expect(response.body[0].error).to.eq(
                'Username must be 4 characters long.'
            );
            expect(response.body[1].error).to.eq('Password is required.');
        });
    });
});
