Cypress.config('defaultCommandTimeout', 25000);

describe('Тесты для https://testqastudio.me/', function () {
    beforeEach(() => {
        cy.visit('https://testqastudio.me/');
    })

    it('Тест 1', function () {
        cy.contains('БРОММС Двухместная кровать').click();
        cy.get('.cart .quantity .increase').first().click().click();
        cy.get('input[name="quantity"]').should('have.value', '3');
        cy.get('button[type="submit"]').first().click();
        cy.get('.cart-panel-content .close-account-panel.button-close').first().should('be.visible').click();
        cy.contains('Главная').click();
        cy.contains('КЛЛАРИОН Низкий столик').click();
        cy.get('button[type="submit"]').first().click();
        // На сайте ошибка орфографии: должно быть Оформление заказа 
        cy.contains('Оформение заказа').should('be.visible').click();
        cy.get('#billing_first_name').type('FirstName');
        cy.get('#billing_last_name').type('LastName');
        cy.get('#billing_company').type('Company');
        cy.get('#billing_address_1').type('N Street');
        cy.get('#billing_address_2').type('N House');
        cy.get('#billing_city').type('City');
        cy.get('#billing_state').type('State');
        cy.get('#billing_postcode').type('Postcode');
        cy.get('#billing_phone').type('8885553535');
        cy.get('#billing_email').type('test@mail.ru');
        cy.contains('Подтвердить заказ').click();
        cy.contains('Ваш заказ принят. Благодарим вас').should('be.visible')
    });
})
