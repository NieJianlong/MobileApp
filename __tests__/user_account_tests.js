import {
    REGISTER_BUYER, UPDATE_BUYER_PROFILE, CREATE_PAYMENT_DETAIL
} from '../App/Apollo/mutations/mutations_user'
import {
    FIND_PAYMENT_DETAIL_BY_ID,FIND_BUYER_PROFILE
} from '../App/Apollo/queries/queries_user'

import { runTokenFlow  } from '../App/Apollo/jwt-request'
import {getPrivateTestClient} from '../App/Apollo/private-api-v3'

/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'

let url = 'http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'

jest.mock("@react-native-community/async-storage", () =>
    require("@react-native-community/async-storage/jest/async-storage-mock"),
);


let JWT ='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjEwMzgzOTYsImlhdCI6MTYyMTAwMjM5NiwianRpIjoiYmVlODUzZjgtY2E5OC00Nzg0LTgxODMtOTBiMjNkZDhlNTU0IiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiZDAzN2Q5ZmEtMWE1Mi00YWY2LWIwMDctZjY0MThiZDVjM2QzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.SJVt_v2zNe-ZcptseES_PQxJOAXTuUQ1tREX0-YjV90r-gcE4JDiqMR89ap55CFXLTrshSaI0lBmhCMkn7GdK1xIyTZmUlxgCI-80QRc2o3kCHtablk_dNTewYCuy2hFTtkc1nOUUZwS3ryFRMptoAECyxaJG4bRxdKY87uZORb_PqBJrd_hmEEZBqKhtR6qyxO0sEZlGj1s8N6J92X2JGgRC1AYlpmxE5Za8Py7Z39nXc9Z4nmGSSnLSi1vjShcL6yF73rW8NC07z1ZF4QW_Jy1l7_qnGMIGoUAjPbJcXCjTBSxNR9Zme4cCDmujraFikcJKKpngpjQUQVtMrE5ew'

/**
 * first login as an existing buyer to get the correct JWT token for the
 * buyers roles
 * see test register buyer
 * 
 */
// node_modules/jest/bin/jest.js -t 'makes login request'
it('makes login request', async () => {
   
    let loginRequest = { username: 'bu@email.com', password: '1R2T#$6Tkop224'}
      let ret = await runTokenFlow(loginRequest)
      // for (const key in ret) {
      //     console.log(`${key}: ${ret[key]}`);
      // }
      if (typeof ret !== 'undefined') {
      console.log(`${ ret.data.access_token}`)
     // console.log(`id_token\n ${ ret.data.id_token}`)
        //   console.log(`refresh_token\n ${ ret.data.refresh_token}`)
     }
  });

/** 
 * FIND_BUYER_PROFILE is a private api
 * a buyer profile is created in onboarding section with registerBuyer mutation
 * see onboarding_tests.js see test register buyer
 */
// node_modules/jest/bin/jest.js -t 'test get buyer_profile'
it('test get buyer_profile', async () => {
    let client = await getPrivateTestClient(JWT)
  
    let ret = await client.query({
        query: FIND_BUYER_PROFILE,
        variables: {"buyerId":"f3d26ef6-3666-407b-b6b5-389828487b39"}
    })
        .then(result => result)
        .catch(err => { 
          if (typeof err !== 'undefined') {
            console.log("Query error " + err) 
          }
         
        });
  
    if (typeof ret !== 'undefined') {
          console.log(JSON.stringify(ret.data.buyerProfile ))
       }
  });

/** 
 * UPDATE_BUYER_PROFILE is a private api
 * a buyer profile is created in onboarding section with registerBuyer mutation
 * see onboarding_tests.js see test register buyer
 */
// node_modules/jest/bin/jest.js -t 'test update buyer_profile'
it('test update buyer_profile', async () => {

    let BuyerProfileRequest = {
        buyerId:"f3d26ef6-3666-407b-b6b5-389828487b39", 
        userName:'updatedUserName',
        firstName:'updatedfirstName',
        lastName:'updatedlastName',
        email:'updatedEmail@up.com',
        oneClickPurchaseOn:true,  
        userType: 'BUYER',  oneClickPurchaseOn:true, guestBuyer:false, 
    }
    let client = await getPrivateTestClient(JWT)
    let ret = await client.mutate({
        mutation: UPDATE_BUYER_PROFILE,
        variables: { request: BuyerProfileRequest }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});


/**
 * CREATE_PAYMENT_DETAIL is a private api
 */
// PaymentDetailRequestForCreate{buyerId:ID! paymentType:PaymentType isDefaultPaymentType:Boolean 
// paymentTypeDetails:String}
// node_modules/jest/bin/jest.js -t 'test createPaymentDetail'
it('test createPaymentDetail', async () => {
    let PaymentDetailRequestForCreate = {
        buyerId:"f3d26ef6-3666-407b-b6b5-389828487b39", 
        paymentType:'CREDIT_CARD',
        isDefaultPaymentType:true,  
        paymentTypeDetails:'',
    }
    let client = await getPrivateTestClient(JWT)
    let ret = await client.mutate({
        mutation: CREATE_PAYMENT_DETAIL,
        variables: { request: PaymentDetailRequestForCreate }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }
});


//+++++++++++++++++ create a register buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// node_modules/jest/bin/jest.js -t 'test register buyer'
//  {"data":{"registerBuyer":{"buyerId":"f3d26ef6-3666-407b-b6b5-389828487b39","__typename":"BuyerProfileResponse"}}}
it('test register buyer', async () => {
    let BuyerProfileRequestForCreate = {
        userName: 'bu3634',
        firstName: 'bu363Y4',
        lastName: 'bu336YR',
        geoLocation: '1.2.3.44',
        phoneNumber: '+33266300124',
        guestBuyer: false,
        email: 'bu@email.com', userType: 'BUYER', password: '1R2T#$6Tkop224',
        oneClickPurchaseOn: true, areaRegion: '',
        languages: [
            "EN"
        ], currencies: [
            "EUR"
        ]
    }
    let client = await endPointClient(url)
    let ret = await client.mutate({
        mutation: REGISTER_BUYER,
        variables: { request: BuyerProfileRequestForCreate }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});




