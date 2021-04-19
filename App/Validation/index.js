
const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const PHONE_REG = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
 
const INTNTL_PHONE_REG =/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/


/**
 *  at least 1 lowercase alphabetical character
 *  at least 1 uppercase alphabetical character
 *  at least 1 numeric character
 *  at least one special character
 *  eight characters or longer
 */
const STRONG_PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

/**
 *  at least 1 lowercase alphabetical character
 *  at least 1 uppercase alphabetical character
 *  at least 1 numeric character
 *  eight characters or longer
 */
const WEAK_PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
 

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

/** min 8 chars for now */
export const isValidPassword = (loginInput) => { return WEAK_PASSWORD_VALIDATION.test(loginInput) }


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
 
}

/** a function to decide if a register user request is a valid with correct error flags */
export const registerValidator = (registerValues) => {
    console.log(`debug registerValidator ${JSON.stringify(registerValues)}`)
    let reporter = { validPhoneOrEmail: true, validPassword:true }
    let { registerInput, psswd } = registerValues
    // check for missing values
    let missing = checkMissingRegisterValues(registerValues)
    if (missing.hasMissing) {
        // we are missing something
        reporter.hasMissing = true
        reporter.missingVal = missing.missingVal
        return reporter
    }

    let validPassword = isValidPassword(psswd)
    if (!validPassword) {
        reporter.validPassword = false
        return reporter
    } 

    let ret = loginDifferentiator(registerInput)
    if (ret.isValid) {
        // we have decided lets check email or phone
        if (ret.isEmail) {
            reporter.isEmail = true
        } else {
            reporter.isPhone = true
        }

    } else {
        reporter.validPhoneOrEmail = false
        return reporter
    }
    return reporter
}






//================= Private utility functions for validation
function checkMissingRegisterValues(registerValues) {
    let { name, lastName, registerInput, psswd } = registerValues
    let missingVals = { hasMissing: false }
    // lets check name and last name exist
    if (typeof name === 'undefined' || name === "") {
        missingVals.hasMissing = true
        missingVals.missingVal = 'Name'
        return missingVals

    }
    if (typeof lastName === 'undefined' || lastName === "") {
        missingVals.hasMissing = true
        missingVals.missingVal = 'Last Name'
        return missingVals
    }
    if (typeof registerInput === 'undefined' || registerInput === "") {
        missingVals.hasMissing = true
        missingVals.missingVal = 'Email or Phone'
        return missingVals
    }

    if (typeof psswd === 'undefined' || psswd === "") {
        missingVals.hasMissing = true
        missingVals.missingVal = 'Password'
        return missingVals
    }

    return missingVals
 
}
