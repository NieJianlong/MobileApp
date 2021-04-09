
const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const PHONE_REG = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const INTNTL_PHONE_REG =/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/

/**
 * there will be a bunch of validation functions
 * other than the standard regx patterns
 * we will be validationg for XSS for example
 * 
 * nice way to use this will be
 * 
 * import * as validator from '../Validation' 
 * then  validator.isValidEmail(...)
 * 
 */

export const isValidEmail = (loginInput) => { return EMAIL_REG.test(loginInput) }

export const isValidPhone = (loginInput) => { return INTNTL_PHONE_REG.test(loginInput) }

/** a function to decide an input is a valid phone or an email */
export const loginDifferentiator = (loginInput) => {
    let diff = { isValid: true }
    // first check email
    if (isValidEmail(loginInput)) {
        diff.isEmail = true
    } else if (isValidPhone(loginInput)) {
        diff.isPhone = true
    } else {
        diff.isValid = false
    }
    return diff
}