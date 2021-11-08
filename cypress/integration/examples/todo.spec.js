/// <reference types="cypress" />
import {
  MagicFunctions
} from '../../libs/functions.js'

const mf = new MagicFunctions()

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://example.cypress.io/todo')
  })

  it('displays two todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    //cy.get('.todo-list li').should('have.length', 2)

    let get_obj = mf.GET_OBJ(
      mf.selector_type.CLASS,
      'todo-list',
      [
        mf.item_type.LI
      ],
      null,
      mf.condition.HAVE_LENGTH,
      2,
      null
    )
    
    mf.get_any(get_obj, null)

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    get_obj = mf.GET_OBJ(
      mf.selector_type.CLASS,
      'todo-list',
      [
        mf.item_type.LI
      ],
      mf.position.FIRST,
      mf.condition.HAVE_TEXT,
      'Pay electric bill',
      null
    )
    mf.get_any(get_obj, null)
    // cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    get_obj = mf.GET_OBJ(
      mf.selector_type.CLASS,
      'todo-list',
      [
        mf.item_type.LI
      ],
      mf.position.LAST,
      mf.condition.HAVE_TEXT,
      'Walk the dog',
      null
    )
    mf.get_any(get_obj, null)
    // cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat'

    // Let's get the input element and use the `type` command to
    // input our new list item. After typing the content of our item,
    // we need to type the enter key as well in order to submit the input.
    // This input has a data-test attribute so we'll use that to select the
    // element in accordance with best practices:
    // https://on.cypress.io/selecting-elements

    let type_obj = mf.TYPE_OBJ(
      "data-test",
      "new-todo",
      newItem,
      mf.key.ENTER,
      mf.action.TYPE
    )

    mf.get_any(null, type_obj)
    //cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.

    let get_obj = mf.GET_OBJ(
      mf.selector_type.CLASS,
      'todo-list',
      [
        mf.item_type.LI
      ],
      null,
      mf.condition.HAVE_LENGTH,
      3,
      null
    )
    mf.get_any(get_obj, null)

    get_obj = mf.GET_OBJ(
      mf.selector_type.CLASS,
      'todo-list',
      [
        mf.item_type.LI
      ],
      mf.position.LAST,
      mf.condition.HAVE_TEXT,
      newItem,
      null
    )
    mf.get_any(get_obj, null)
    // cy.get('.todo-list li')
    //   .should('have.length', 3)
    //   .last()
    //   .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
    // In addition to using the `get` command to get an element by selector,
    // we can also use the `contains` command to get an element by its contents.
    // However, this will yield the <label>, which is lowest-level element that contains the text.
    // In order to check the item, we'll find the <input> element for this <label>
    // by traversing up the dom to the parent element. From there, we can `find`
    // the child checkbox <input> element and use the `check` command to check it.
    let get_obj = mf.GET_OBJ(
      mf.selector_type.CONTAINS,
      'Pay electric bill',
      [
        mf.item_type.PROP,
        'input[type=checkbox]'
      ],
      mf.position.PARENT,
      null,
      null,
      mf.action.CHECK
    )
    mf.get_any(get_obj, null)

    //cy.contains('Pay electric bill')
    //  .parent()
    //  .find('input[type=checkbox]')
    //  .check()

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    // Again we'll use `contains` to find the <label> element and then use the `parents` command
    // to traverse multiple levels up the dom until we find the corresponding <li> element.
    // Once we get that element, we can assert that it has the completed class.
    //cy.contains('Pay electric bill')
    //  .parents('li')
    //  .should('have.class', 'completed')

    mf.debe(mf.pariente(mf.contiene(
      'Pay electric bill', null), 
      mf.tipo_objeto.LI), 
      mf.debe_objeto.TENER_CLASE, 
      'completed')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.

      mf.encuentra(mf.pariente(mf.contiene(
        'Pay electric bill', null), 
        null), 
        'input[type=checkbox]', 
        mf.accion.CHECK)

      //cy.contains('Pay electric bill')
      //  .parent()
      //  .find('input[type=checkbox]')
      //  .check()
    })

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      mf.contiene('Active', mf.accion.CLICK)
      //cy.contains('Active').click()

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.

      mf.obtener('.todo-list li')
      mf.debe(null, mf.debe_objeto.TENER_LONGITUD, 1)
      mf.primero()
      mf.debe(null, mf.debe_objeto.TENER_TEXTO, 'Walk the dog')

      //cy.get('.todo-list li')
      //  .should('have.length', 1)
      //  .first()
      //  .should('have.text', 'Walk the dog')

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      mf.contiene('Pay electric bill', mf.accion.NO_EXISTE)
      //cy.contains('Pay electric bill').should('not.exist')
    })

    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      mf.contiene('Completed', mf.accion.CLICK)
      //cy.contains('Completed').click()

      mf.obtener('.todo-list li')
      mf.debe(null, mf.debe_objeto.TENER_LONGITUD, 1)
      mf.primero()
      mf.debe(null, mf.debe_objeto.TENER_TEXTO, 'Pay electric bill')

      //cy.get('.todo-list li')
      //  .should('have.length', 1)
      //  .first()
      //  .should('have.text', 'Pay electric bill')

      mf.contiene('Walk the dog', mf.accion.NO_EXISTE)
      //cy.contains('Walk the dog').should('not.exist')
    })

    it('can delete all completed tasks', () => {
      // First, let's click the "Clear completed" button
      // `contains` is actually serving two purposes here.
      // First, it's ensuring that the button exists within the dom.
      // This button only appears when at least one task is checked
      // so this command is implicitly verifying that it does exist.
      // Second, it selects the button so we can click it.
      mf.contiene('Clear completed', mf.accion.CLICK)
      //cy.contains('Clear completed').click()

      // Then we can make sure that there is only one element
      // in the list and our element does not exist

      mf.obtener('.todo-list li')
      mf.debe(null, mf.debe_objeto.TENER_LONGITUD, 1)
      mf.debe(null, mf.debe_objeto.NO_TENER_TEXTO, 'Pay electric bill')

      //cy.get('.todo-list li')
      //  .should('have.length', 1)
      //  .should('not.have.text', 'Pay electric bill')

      // Finally, make sure that the clear button no longer exists.
      mf.contiene('Clear completed', mf.accion.NO_EXISTE)
      //cy.contains('Clear completed').should('not.exist')
    })
  })
})
