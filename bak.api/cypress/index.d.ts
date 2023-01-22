declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(
            loginValues: {
                username: string;
                password: string;
            },
            failOnStatusCode: boolean
        ): Chainable<void>;
    }
}
