
describe('Тесты для формы логина и пароля на   https://login.qa.studio/', function () {
    beforeEach(() => {
        cy.visit('https://login.qa.studio/');
    })

    it('Позитивный кейс авторизации', function () {
        cy.get("#mail").type('german@dolnikov.ru');
        cy.get("input[type='password']").type('iLoveqastudio1');
        cy.get("#loginButton").click();

        cy.contains('Авторизация прошла успешно').should("be.visible");
        cy.get('.exitIcon').should('be.visible')
    });

    it('Символы разного регистра', function () {
        cy.get("#mail").type('GerMan@Dolnikov.ru');
        cy.get("input[type='password']").type('iLoveqastudio1');
        cy.get("#loginButton").click();

        cy.contains('Авторизация прошла успешно').should("be.visible");
        cy.get('.exitIcon').should('be.visible')
    });

    it('Негативный кейс авторизации - неправильный пароль', function () {
        cy.get("#mail").type('german@dolnikov.ru');
        cy.get("input[type='password']").type('wrong-password');
        cy.get("#loginButton").click();

        cy.contains('Такого логина или пароля нет').should("be.visible");
        cy.get(".exitIcon").should('be.visible')
    });

    it('Негативный кейс авторизации - неправильный логин', function () {
        cy.get("#mail").type('wrong-mail@mail.ru');
        cy.get("input[type='password']").type('iLoveqastudio1');
        cy.get("#loginButton").click();

        cy.contains('Такого логина или пароля нет').should("be.visible");
        cy.get(".exitIcon").should('be.visible')
    });

    it('Негативный кейс авторизации - ошибка валидации', function () {
        cy.get("#mail").type('invalid-mail');
        cy.get("input[type='password']").type('iLoveqastudio1');
        cy.get("#loginButton").click();

        cy.contains('Нужно исправить проблему валидации').should("be.visible");
        cy.get(".exitIcon").should('be.visible')
    });

    it('Логика восстановления пароля - валидный email', function () {
        cy.get("#forgotEmailButton").click();
        cy.get("#mailForgot").type('german@dolnikov.ru');
        cy.get("#restoreEmailButton").click();

        cy.contains('Успешно отправили пароль на e-mail').should("be.visible");
        cy.get(".exitIcon").should('be.visible')
    });

    it('Логика восстановления пароля - НЕ валидный email', function () {
        cy.get("#forgotEmailButton").click();
        cy.get("#mailForgot").type('not-valid-email');
        cy.get("#restoreEmailButton").click();

        cy.contains('Нужно исправить проблему валидации').should("be.visible");
        cy.get(".exitIcon").should('be.visible')
    });
})
