/// <reference types="cypress" />

describe('go to GSI 3.0 WebSite', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://the-internet.herokuapp.com/')
    })

    it('site displays something', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are certain conditions,
        cy.get('.heading')
        .first().should('have.text', "Welcome to the-internet")

        cy.get('h2')
        .first().should('have.text', "Available Examples")

        cy.get('li')
        .should('have.length', 44)
    })

    it('site clicks something', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are certain conditions,
        cy.get("[href='/abtest']").click()
        cy.go('back')
        cy.get("[href='/add_remove_elements/']").click()
        for(let i = 0;i < 3;i++)
            cy.get("[onclick='addElement()']").click()
        for(let i = 0;i < 3;i++)
            cy.get('.added-manually').first().click()
        cy.go('back')
        cy.get("[href='/dropdown']").click()
        cy.get("#dropdown").select('Option 1')
        cy.get("#dropdown").select('Option 2')
    })

    it('sends some data to inputs', () => {
        cy.visit('http://the-internet.herokuapp.com/login')
        cy.get('h4').get('em').should('have.length', 2)
        .then((value) => {
            cy.get("#username").type(value[0].innerText)
            cy.get("#password").type(value[1].innerText)
            cy.get("button[type='submit']").click()
        })
    })

    it('let\'s do some damage', () => {
        cy.visit('http://the-internet.herokuapp.com/')
    })
})