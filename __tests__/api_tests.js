import {endPointClient} from '../App/Apollo/public-api -v3'
import { REGISTER_USER,CREATE_ADDRESS, 
  CREATE_DELIVERY_ADDRESS_GEOCOORDINATE, 
  CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
  NEW_ID } from '../App/Apollo/mutations/mutations_user'

/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'

let url = ' http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'


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

it('test register user', async () => {
  let UserProfileRequest = { userName:'guest', email:'guest@email.com', userType:'GUEST_USER', password:'12#$Tymkop' }
  let client = await endPointClient(url)
  let ret = await client.mutate({
    mutation: REGISTER_USER, 
    variables: {request: UserProfileRequest}
  })
  .then(result => result)
  .catch(err => { 
      console.log("mutation error " + err)
      return  });

  if (typeof ret !== 'undefined') {
      console.log(ret.data.registerUser.userId)
  }
});


// node_modules/jest/bin/jest.js -t 'test create storeaddress'
it('test create address', async () => {
let AddressRequestInput = { addressId:NEW_ID, defaultAddress:true, addressType:'SHIPPING', 
  streetAddress1:'Earth 3rd planet from sun', referenceId:NEW_ID }
let client = await endPointClient(url)
let ret = await client.mutate({
mutation: CREATE_ADDRESS, 
variables: {request: AddressRequestInput}
})
.then(result => result)
.catch(err => { 
  console.log("mutation error " + err)
  return  });

if (typeof ret !== 'undefined') {
  console.log(ret.data.registerUser.userId)
}

});

it('test create geoaddress', async () => {
  let PointRequest = { x:1.2, y:1.3 }
  let DeliveryAddressGeoCoordinateRequest = { addressId:NEW_ID, coordinates:PointRequest }
  let client = await endPointClient(url)
  let ret = await client.mutate({
  mutation: CREATE_DELIVERY_ADDRESS_GEOCOORDINATE, 
  variables: {request: DeliveryAddressGeoCoordinateRequest}
  })
  .then(result => result)
  .catch(err => { 
    console.log("mutation error " + err)
    return  });
  
  if (typeof ret !== 'undefined') {
    console.log(ret.data.registerUser.userId)
  }
  
  });


it('test create storeaddress', async () => {
  let DeliveryAddressToOnlineStoreRequest = { addressId:NEW_ID, storeId:NEW_ID  }
  let client = await endPointClient(url)
  let ret = await client.mutate({
  mutation: CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE, 
  variables: {request: DeliveryAddressToOnlineStoreRequest}
  })
  .then(result => result)
  .catch(err => { 
    console.log("mutation error " + err)
    return  });
  
  if (typeof ret !== 'undefined') {
    console.log(ret.data.registerUser.userId)
  }
  
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


