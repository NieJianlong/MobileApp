import {endPointClient} from '../App/Apollo/public-api-v3'
import {getPrivateTestClient} from '../App/Apollo/private-api-v3'
// 
import {  
  CREATE_DELIVERY_ADDRESS_GEOCOORDINATE, 
  CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
 } from '../App/Apollo/mutations/mutations_user'

import { 
    BUYER_PROFILES,FIND_BUYER_PROFILE, FIND_BUYER_ADDRESS_BY_ID } from '../App/Apollo/queries/queries_user'

/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'
import { runTokenFlow } from '../App/Apollo/jwt-request'
 

let JWT ='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjA5MzY4MjEsImlhdCI6MTYyMDkwMDgyMSwianRpIjoiZDk3NmU1OGQtMGJjYy00NDk1LTg1NDItNWVhYzY0MTA5OGEyIiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNTg2OGEyZWQtYjY4My00M2YzLWJiNWMtOGMwMjIxMGE1NzBjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.RTIGatrCR-gWOfb8wMnS-gyI7atAR8ZwaZiKxslomSGdVAPmAxLhIP6j84lCdLhAkOEPATlz4NmqEGH_-t7bdF2dZtpBZaSwicX1QF6Zb3GSG7MwOtSBPWS2vUaHYA8QowFXRtyiSQ22BfuH6LVIT4NS4LBN8_k2fhDOhPwekhcWAixwsB3t5f1u-sHdEuI0erL9nP3RZBBj1sDRGemkRbGlpyKxQmbnMMV0-YYkHKY2eCmigHGVCUPqPTeRKmOqnd2mYpajOg9L3k7X0EKfH6SPendjflsYMurUjZIiZXb8lU0HAE--UI75c2D7xe6gVEbYIBRDduwVre_9AgFPyQ'


jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock"),
);

/**
 * Tests for private api development
 * 
 * Run the loging with a registered buyer to get a token with the correct permissions
 * then copy for JWT above to run the private client
 * 
 */
//  node_modules/jest/bin/jest.js -t 'test login'
it('test login', async () => {
  //{"data":{"createGuestBuyer":{"buyerId":"acf755fe-20e4-4133-a595-8c01aab272df","__typename":"BuyerProfileResponse"}
  //     userName:'buyer2', 
  let loginRequest = { username: 'massimo.03', password: 'massimo.03'}
    let ret = await runTokenFlow(loginRequest)
    // for (const key in ret) {
    //     console.log(`${key}: ${ret[key]}`);
    // }
    if (typeof ret !== 'undefined') {
    //  console.log(`${JSON.stringify(ret.data)}`)
    console.log(`access_token\n ${ ret.data.access_token}`)
      //   console.log(`refresh_token\n ${ ret.data.refresh_token}`)
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