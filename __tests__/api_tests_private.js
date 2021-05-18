import {getPrivateTestClient} from '../App/Apollo/private-api-v3'
// 
import {  
  CREATE_DELIVERY_ADDRESS_GEOCOORDINATE, 
  CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
 } from '../App/Apollo/mutations/mutations_user'
 
import {
      FIND_BUYER_ADDRESS_BY_ID,
      FIND_BUYER_PROFILE,
      FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      FIND_GUEST_BUYER_ADDRESS_BY_ID,
      FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID
  } from '../App/Apollo/queries/queries_user'

/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'
import { runTokenFlow } from '../App/Apollo/jwt-request'
 

let JWT ='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjEzMTc1MTEsImlhdCI6MTYyMTI4MTUxMSwianRpIjoiNWZlMjY0NTMtZWQzZC00ZGVjLWJmOTQtMjM2YmQxZGU0YWI0IiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiMDkxZWMzNTQtZDNjMS00NWFhLTg4MmMtNDA3ZjMwNzhjMmE1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.JfiYphaa-cdQ2j4QnXj46DteCTEBHTxKNI-4H4GlslFJxtOCRauC5_O54hDggbWKWQsWGRZXA_n0GzBESWQOZqJd4KLtSXXT-p5Dw9NHbSzs9cNA3tO0VimW-YJsBxQu7X51dBvjaKxgbSg883siy9ZvmvR6MLYi8lcEDwnF5KcChQo-aK3GKZH0xMqJGltkpm5tUJvHmlmRXW3r-bcnqjKGoXHsCpll6CXBsgCHpOtOoUREux7Y4R2W8GFWKty6zcYBMWxPG78_Im-Uf1S9LIHhUz11uc81qlgz1MXcUqXUUhbM31-2cJO5IfjnbY_4lLqMjJ6FmqPI3NOtqvPG5g'


jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock"),
);

/**
 * Tests for private api development
 * 
 * Run the login with a registered buyer to get a token with the correct permissions
 * then copy for JWT above to run the private client
 * 
 */

/**
 * first login as an existing buyer to get the correct JWT token for the
 * buyers roles
 * see test register buyer
 * 
 */
// node_modules/jest/bin/jest.js -t 'makes login request'
it('makes login request', async () => {
   
  let loginRequest = { username: 'sal@bal.com', password: '12RR#erfghjui'}
    let ret = await runTokenFlow(loginRequest)
    // for (const key in ret) {
    //     console.log(`${key}: ${ret[key]}`);
    // }
    if (typeof ret !== 'undefined') {
    console.log(`${ ret.data.access_token}`)
   // console.log(`id_token\n ${ ret.data.id_token}`)
   // console.log(`refresh_token\n ${ ret.data.refresh_token}`)
   }
});


// node_modules/jest/bin/jest.js -t 'test getBuyerAddressesById'
it('test getBuyerAddressesById', async () => {
  // public api
  let client = await  getPrivateTestClient(JWT)
  let ret = await client.query({
      query: FIND_BUYER_ADDRESS_BY_ID,
      variables: { buyerId: '36f9e312-a5c4-4228-a740-7ddbb2cbc88c' }
  })
      .then(result => result)
      .catch(err => {
          console.log("query error " + err)
          return
      });

  if (typeof ret !== 'undefined') {
      console.log(JSON.stringify(ret))
  }

});

// node_modules/jest/bin/jest.js -t 'test getBuyerDefaultAddressByBuyerId'
it('test getBuyerDefaultAddressByBuyerId', async () => {
  // public api
  let client = await  getPrivateTestClient(JWT)
  let ret = await client.query({
      query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: '2a311b52-5000-4e65-a079-2b33769cbb48' }
  })
      .then(result => result)
      .catch(err => {
          console.log("query error " + err)
          return
      });

  if (typeof ret !== 'undefined') {
      console.log(JSON.stringify(ret))
  }

});

/**
 * CREATE_DELIVERY_ADDRESS_GEOCOORDINATE is a private api
 */
// node_modules/jest/bin/jest.js -t 'test create createDeliveryAddressGeoCoordinate'
it('test create createDeliveryAddressGeoCoordinate', async () => {
  let PointRequest = { x:1.2, y:1.3 }
  let DeliveryAddressGeoCoordinateRequest = { addressId:NEW_ID, coordinates:PointRequest }
  let client = await getPrivateTestClient(JWT)
  let ret = await client.mutate({
  mutation: CREATE_DELIVERY_ADDRESS_GEOCOORDINATE, 
  variables: {request: DeliveryAddressGeoCoordinateRequest}
  })
  .then(result => result)
  .catch(err => { 
    console.log("mutation error " + err)
    return  });
  
  if (typeof ret !== 'undefined') {
    console.log(JSON.stringify( ret.data ))
  }
  
  });


/**
 *   mutation: CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE, 
 is a private api
 */
//  node_modules/jest/bin/jest.js -t 'test create createDeliveryAddressToOnlineStore'
it('test create createDeliveryAddressToOnlineStore', async () => {
  let DeliveryAddressToOnlineStoreRequestForCreate = { addressId:NEW_ID, storeId:NEW_ID  }
  let client =  getPrivateTestClient(JWT)
  let ret = await client.mutate({
  mutation: CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE, 
  variables: {request: DeliveryAddressToOnlineStoreRequestForCreate}
  })
  .then(result => result)
  .catch(err => { 
    console.log("mutation error " + err)
    return  });
  
  if (typeof ret !== 'undefined') {
    console.log(JSON.stringify( ret.data ))
  }
  
  });