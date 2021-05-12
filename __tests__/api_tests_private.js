import {endPointClient} from '../App/Apollo/public-api-v3'
import {getPrivateTestClient} from '../App/Apollo/private-api-v3'
// 
import {  
  CREATE_DELIVERY_ADDRESS_GEOCOORDINATE, 
  CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
 } from '../App/Apollo/mutations/mutations_user'

import { 
    BUYER_PROFILES, FIND_BUYER_ADDRESS_BY_ID } from '../App/Apollo/queries/queries_user'

/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'
import { runTokenFlow, runRefreshTokenFlow } from '../App/Apollo/jwt-request'

let url = ' http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'

let JWT ='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjA2ODE5MDEsImlhdCI6MTYyMDY0NTkwMSwianRpIjoiNzFiNWYzMjYtZjRiZS00MTZkLTkyNTAtNTc3Yzg4OTI4YzRkIiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjExMjhmZWNjLTdjMWQtNGZkZS04MDM3LTYwZTAwMDdjNDAyNiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImlhbS1rZXljbG9hay1wcm94eS1zZXJ2aWNlLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI3ZTJlNDkwZC1kZGYzLTQ3ODQtYWFkMS1hNTNiMzJhMjk1YTYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4NSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImJ1eWVyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik1hc3NpbW8gRm9ydHVuYXQiLCJncm91cHMiOiJbb2ZmbGluZV9hY2Nlc3MsIHVtYV9hdXRob3JpemF0aW9uLCBidXllcl0iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXNzaW1vLjAzIiwiZ2l2ZW5fbmFtZSI6Ik1hc3NpbW8iLCJmYW1pbHlfbmFtZSI6IkZvcnR1bmF0IiwiZW1haWwiOiJtYXNzaW1vLnByb2plY3Quc2FsYW1pc2xpY2luZy4wMy5nbWFpbC5jb20ifQ.CN7XBqXKDUiS6czTES9F9ziS4rm1jpl5TdcjPKALB8frN8FbgN6P24dysFsD5r_6C0bmbmhEcRykr8GiYbiGf8mEDfTxbp_3AOuTSlcik9tWIUVbqCXxSNri8IRU3Nm-QO3TzzNC9K8NSidb0GS_sJ07h4tAQwJ-q30TRu-KB73QcXME1ItUhUAXTLW3rbA8wUgp79Jj-94Lil1VDRk1oI0BFc75MGCRhFU3KKempaxMlAvywQIcUR3UoT_MjReNB6WlJtCPY-zgCk66FvVIyvFYQES3Gd_vgMUy4q8Ar3VK3e1UmCGKvHpf8haEifN28_fEh7jbeplglLKgwSTW2g'


jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock"),
);

//  node_modules/jest/bin/jest.js -t 'test login registerBuyer'
it('test login registerBuyer', async () => {
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


// node_modules/jest/bin/jest.js -t 'test get all buyer_profiles'
it('test get all buyer_profiles', async () => {
  let client = await getPrivateTestClient(JWT)

  let ret = await client.query({
      query: BUYER_PROFILES,
  })
      .then(result => result)
      .catch(err => { 
        if (typeof err !== 'undefined') {
          console.log("Query error " + err) 
        }
       
      });

  if (typeof ret !== 'undefined') {
        console.log("ret !== undefined")
        console.log(JSON.stringify(ret))
     }
     
     console.log("ret === undefined")
 // 

});

 

// node_modules/jest/bin/jest.js -t 'private debug'
it('private debug', async () => {
 

  console.log(BUYER_PROFILES)

});