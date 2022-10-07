import * as validator from '../App/Validation';

/**
 * validation hook tests
 */
const INVALID_PHONE = '+4412@2345456';
const VALID_PHONE = '+441232345456';

const INVALID_EMAIL = 'drop database user;';
const VALID_EMAIL = 'silly1@billy.com';

const INVALID_PASSWORD = 'short';
const STRONG_VALID_PASSWORD = 'longerWww2!';
const WEAK_VALID_PASSWORD = 'longerWww2';

/** validation tests */

it('test email valid', async () => {
  expect(validator.isValidEmail(VALID_EMAIL)).toBe(true);
  expect(validator.isValidEmail(INVALID_EMAIL)).toBe(false);
});

it('test phone valid', async () => {
  expect(validator.isValidPhone(VALID_PHONE)).toBe(true);
  expect(validator.isValidPhone(INVALID_PHONE)).toBe(false);
});

it('test determine user input', async () => {
  let ret = validator.loginDifferentiator(VALID_EMAIL);
  expect(ret.isValid).toBe(true);
  expect(ret.isEmail).toBe(true);

  let ret2 = validator.loginDifferentiator(VALID_PHONE);
  expect(ret2.isValid).toBe(true);
  expect(ret2.isPhone).toBe(true);

  let ret3 = validator.loginDifferentiator(INVALID_EMAIL);
  expect(ret3.isValid).toBe(false);

  let ret4 = validator.loginDifferentiator(INVALID_PHONE);
  expect(ret4.isValid).toBe(false);
});

it('test login screen', async () => {
  let ret = validator.loginDifferentiator(VALID_EMAIL);
  expect(ret.isValid).toBe(true);
  expect(ret.isEmail).toBe(true);
  ret = validator.loginDifferentiator(INVALID_EMAIL);
  expect(ret.isValid).toBe(false);
});

//=============== Register validation

it('test register screen', async () => {
  /**
   * reporter validPhoneOrEmail, hasMissing, missingVal, isEmail, isPhone, validPassword
   *
   */
  let registerValues = {
    name: 'silly',
    lastName: 'silly',
    registerInput: VALID_EMAIL,
    psswd: WEAK_VALID_PASSWORD,
  };
  let reporter = validator.registerValidator(registerValues);
  expect(reporter.hasMissing).toBe(undefined);
  expect(reporter.missingVal).toBe(undefined);
  expect(reporter.missingVal).toBe(undefined);
  expect(reporter.validPassword).toBe(true);
  expect(reporter.validPhoneOrEmail).toBe(true);
  registerValues.psswd = INVALID_PASSWORD;
  reporter = validator.registerValidator(registerValues);
  expect(reporter.validPassword).toBe(false);
  registerValues.psswd = WEAK_VALID_PASSWORD;
  registerValues.registerInput = INVALID_EMAIL;
  reporter = validator.registerValidator(registerValues);
  expect(reporter.validPhoneOrEmail).toBe(false);
  registerValues.registerInput = INVALID_PHONE;
  expect(reporter.validPhoneOrEmail).toBe(false);
});

//==================== Password rules

it('test password rules', async () => {
  /** for now single rule is 8 chars min */
  expect(validator.isValidPassword(WEAK_VALID_PASSWORD)).toBe(true);
  expect(validator.isValidPassword(INVALID_PASSWORD)).toBe(false);
});

//=================Check personal details

let PERSONAL_DETAILS_CACHE_FIELDS = {
  firstName: 'john',
  lastName: 'doe',
  phoneOrEmailNum: 'silly@billy.com',
  streetName: 'buggy',
  streetNum: '140',
  door: '20',
  city: 'London',
  mstate: 'London',
  postcode: 'HP630G',
  country: 'UK',
};

it('check personal details', async () => {
  let validatorResponse = validator.personalDetailsValidator(
    PERSONAL_DETAILS_CACHE_FIELDS
  );

  console.log(JSON.stringify(validatorResponse));
});
