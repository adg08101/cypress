export class MagicFunctions {
    selector_type = {
        CLASS: "class",
        ID: "id",
        CONTAINS: "contains"
    }
    
    item_type = {
        LI: " li",
        PROP: "property"
    }

    condition = {
        HAVE_LENGTH: "have.length",
        HAVE_TEXT: "have.text"
    }

    position = {
        FIRST: "first",
        LAST: "last",
        PARENT: "parent"
    }

    action = {
        TYPE: "type",
        CHECK: "check"
    }

    key = {
        ENTER: "enter"
    }

    TYPE_OBJ(p_attribute, p_value, p_data, key, action) {
        return {
            attibute: p_attribute,
            value: p_value,
            data: p_data,
            key: key,
            action: action
        }
    }

    GET_OBJ(selector_type, p_value, p_descendant, position, condition, p_condition_value, action) {
        return {
            selector: selector_type,
            value: p_value,
            descendant: p_descendant,
            position: position,
            condition: condition,
            condition_value: p_condition_value,
            action: action
        }
    }
    
    get_any(GET_OBJ, TYPE_OBJ) {
        if (TYPE_OBJ) {
            console.log(TYPE_OBJ)
            cy.get(`[${TYPE_OBJ.attibute}=${TYPE_OBJ.value}]`).type(`${TYPE_OBJ.data}` + '{' + TYPE_OBJ.key + '}')
            return
        } else if (GET_OBJ) {
            console.log(GET_OBJ)
            switch (GET_OBJ.action) {
                case this.action.CHECK:
                    if (GET_OBJ.selector == this.selector_type.CONTAINS
                        && GET_OBJ.position == this.position.PARENT
                        && GET_OBJ.action == this.action.CHECK) {
                            return cy.contains(`${GET_OBJ.value}`)
                            .parent()
                            .find(`${GET_OBJ.descendant[1]}`)
                            .check()
                        }
                    break
            }

            let selector = ""
            switch(GET_OBJ.selector) {
                case this.selector_type.CLASS:
                    // TODO: Apply logic to format descendants
                    selector += "." + GET_OBJ.value + GET_OBJ.descendant
                    break
                case this.selector_type.ID:
                    selector += "#" + GET_OBJ.value + GET_OBJ.descendant
                    break
                default:
                    selector += "." + GET_OBJ.value + GET_OBJ.descendant
                    break
            }

            if (GET_OBJ.position) {
                switch (GET_OBJ.position) {
                    case this.position.FIRST:
                        return cy.get(selector).first().should(GET_OBJ.condition, GET_OBJ.condition_value)
                    case this.position.LAST:
                        return cy.get(selector).last().should(GET_OBJ.condition, GET_OBJ.condition_value)
                    default:
                        return cy.get(selector).should(GET_OBJ.condition, GET_OBJ.condition_value)
                }
            }

            return cy.get(selector).should(GET_OBJ.condition, GET_OBJ.condition_value)
        }
    }
}
