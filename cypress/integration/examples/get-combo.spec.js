/// <reference types="cypress" />

describe('get combo', () => {
    beforeEach(() => {
        cy.visit('https://mail.google.com/chat')
      })

      it('google chat get combo process', () => {
        cy.get('#identifierId').type("ahmed.davila@generalsoftwareinc.com")
        cy.get('#identifierNext').click()
        cy.get("[name='password']").type("ContraGSI2021-*")
        cy.get('#passwordNext').click()
      })
})