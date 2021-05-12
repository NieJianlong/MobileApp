
const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const PHONE_REG = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const INTNTL_PHONE_REG = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/


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
export const isValidPassword = (loginInput) => { 
    return true // for dev only
    //return WEAK_PASSWORD_VALIDATION.test(loginInput)
     }


/** a function to decide an input is a valid phone or an email */
export const loginDifferentiator = (loginInput) => {
    let diff = { isValid: false }
    // first check email
   // console.log('first check email for '+loginInput)
    if (isValidEmail(loginInput)) {
        diff.isEmail = true
        diff.isValid = true
        return diff
    } else if (isValidPhone(loginInput)) {
        diff.isPhone = true
        diff.isValid = true
        return diff
    } else {
        diff.isValid = false
        return diff
    }
    // defensive
    return diff
}

/** a function to decide if a register user request is a valid with correct error flags */
export const registerValidator = (registerValues) => {
   // console.log(`debug registerValidator ${JSON.stringify(registerValues)}`)
    let reporter = { validPhoneOrEmail: true, validPassword: true }
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

/** a function to validate personal details see  CheckOutPersonalDetails screen
 *   let PERSONAL_DETAILS_CACHE_FIELDS = {
    firstName: required
    lastName: required,
    phoneOrEmailNum: required,
    streetName: required',
    streetNum: required,
    door: '',
    city:required,
    mstate: '',
    postcode: required
    country: required
  }
*/
export const personalDetailsValidator = (data) => {
    let missingVals = checkForMissingPersonalDetails(data)
    let reporter = { validPhoneOrEmail: false }
 
    if (missingVals.hasMissing) {
        // we are missing something
        reporter.hasMissing = true
        reporter.missingVal = missingVals.message
        return reporter
    }
    // now check for valid email or phone
    let ret = loginDifferentiator(data.phoneOrEmailNum)
    if (ret.isValid) {
      //  console.log('valid email for '+data.phoneOrEmailNum)
        reporter.validPhoneOrEmail = true
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

function checkForMissingPersonalDetails(data) {
    let missingVals = { hasMissing: false, message: '' }
    if (data.firstName.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'First name is required'
        return missingVals
    }
    if (data.lastName.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'Last name is required'
        return missingVals
    }

    if (data.streetName.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'Street Name is required'
        return missingVals

    }
    if (data.streetNum.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'Street Number is required'
        return missingVals
    }
    if (data.city.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'City is required'
        return missingVals
    }
    if (data.postcode.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'PostCode is required'
        return missingVals
    }
    if (data.country.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'Country is required'
        return missingVals
    }

    if (data.phoneOrEmailNum.length === 0) {
        missingVals.hasMissing = true
        missingVals.message = 'Phone Or Email is required'
        return missingVals
    }
 
    return missingVals
}







