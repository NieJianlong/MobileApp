/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'



jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock"),
);

it('test local token flow', async () => {
  storage.setLocalStorageValue(storage.LOCAL_STORAGE_TOKEN_KEY, 'somejwt')
  const token = await storage.getLocalStorageValue(storage.LOCAL_STORAGE_TOKEN_KEY)
  expect(token).toBe('somejwt')
})

it('test login', async () => {
  expect(await jwt.runMockTokenFlow()).toBe('somejwt')

});


let PERSONAL_DETAILS_CACHE_FIELDS = {
firstName:'', 
lastName:'', 
phoneOrEmailNum:'', 
streetName:'', 
streetNum:'', 
door:'', 
city:'', 
mstate:'', 
postcode:'', 
country:''
}


