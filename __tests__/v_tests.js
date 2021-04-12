import * as validator from '../App/Validation'




/**
 * validation hook tests
 */
const INVALID_PHONE = '+4412@2345456'
const VALID_PHONE = '+441232345456'

const INVALID_EMAIL = 'drop database user;'
const VALID_EMAIL = 'silly@billy.com'


it('test email valid', async () => {
  expect(validator.isValidEmail(VALID_EMAIL)).toBe(true)
  expect(validator.isValidEmail(INVALID_EMAIL)).toBe(false)
});


it('test phone valid', async () => {
  expect(validator.isValidPhone(VALID_PHONE)).toBe(true)
  expect(validator.isValidPhone(INVALID_PHONE)).toBe(false)
});

it('test determine user input', async () => {
  let ret = validator.loginDifferentiator(VALID_EMAIL)
  expect(ret.isValid).toBe(true)
  expect(ret.isEmail).toBe(true)

  let ret2 = validator.loginDifferentiator(VALID_PHONE)
  expect(ret2.isValid).toBe(true)
  expect(ret2.isPhone).toBe(true)

  let ret3 = validator.loginDifferentiator(INVALID_EMAIL)
  expect(ret3.isValid).toBe(false)

  let ret4 = validator.loginDifferentiator(INVALID_PHONE)
  expect(ret4.isValid).toBe(false)


});

