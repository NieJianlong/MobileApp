import {
  REGISTER_BUYER,
  UPDATE_BUYER_PROFILE,
  CREATE_PAYMENT_DETAIL,
} from "../App/Apollo/mutations/mutations_user";
import {
  FIND_PAYMENT_DETAIL_BY_ID,
  FIND_BUYER_PROFILE,
  BUYER_PROFILE_BY_USERID,
} from "../App/Apollo/queries/queries_user";

import { runTokenFlow } from "../App/Apollo/jwt-request";
import { getPrivateTestClient } from "../App/Apollo/private-api-v3";
import { endPointClient } from "../App/Apollo/public-api-v3";

import jwt_decode from "jwt-decode";

/**
 * rest and gql api call tests
 */
import * as jwT from "../App/Apollo/jwt-request";

import * as storage from "../App/Apollo/local-storage";

let url =
  "http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

let JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjE0ODIyOTYsImlhdCI6MTYyMTQ0NjI5NiwianRpIjoiZTE0NTE0NGEtNzkwNy00NmRkLTlhZWYtNDBjYWRhNTU2MWIwIiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiOGQwYzM0NGYtZTJkZC00MmMyLWIzMGQtMzliNzk1ZjZiYmYzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.pFGMeVy1e31oIfruaR-afHhdvfvr3s_PKq-uujX2CjmCGCs3eqoZAv7W00D7OkQUa0P0vRQRNS6XokdOyA8lUkA4cPC8ajE0g8_qepKCnPa2fzgEcWnmoKpF-EYLHnzlK7g7BY1ZZitOlxK0QfRL2pevb8WT5mcYOyYbhWQ_nUwtuLFrB2pnlEkYMXwfjfJpQ7ZhCjVtV2jyEcHMf3b25SR42WZWFOH9_nqWGhNWtfyoViR7yq-6c7AC8UcZkTGTcQwSBO_L32f-e2Ol1FkRy9OiLT9eNp-CrnZJKwJ2N3IdcBD9QYvMCnWnCSDpYhtTQnlzPvYfm7X11AVobLFBiA";

/**
 * first login as an existing buyer to get the correct JWT token for the
 * buyers roles
 * see test register buyer
 *
 */
// node_modules/jest/bin/jest.js -t "makes login request"
it("makes login request", async () => {
  let loginRequest = { username: "bu@email.com", password: "1R2T#$6Tkop224" };
  let ret = await runTokenFlow(loginRequest);
  // for (const key in ret) {
  //     console.log(`${key}: ${ret[key]}`);
  // }
  if (typeof ret !== "undefined") {
    console.log(`${ret.data.access_token}`);
    let jwtToken = ret.data.access_token;
    // console.log(`id_token\n ${ ret.data.id_token}`)
    //   console.log(`refresh_token\n ${ ret.data.refresh_token}`)
    var decoded = jwt_decode(jwtToken);
    console.log(decoded.sub);
  }
});

/**
 *
 *   buyerProfileByUserId(userProfileId : ID!) : BuyerProfileResponse
 *   get userProfileId from JWT decode "sub" is userProfileId
 *
 */
// node_modules/jest/bin/jest.js -t "test get buyerProfileByUserId"
it("test get buyerProfileByUserId", async () => {
  let client = await getPrivateTestClient(JWT);

  let ret = await client
    .query({
      query: BUYER_PROFILE_BY_USERID,
      variables: { userProfileId: "43aeaddd-de66-45bb-81aa-192f4f5e2b33" },
    })
    .then((result) => result)
    .catch((err) => {
      if (typeof err !== "undefined") {
        console.log("Query error " + err);
      }
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret.data));
  }
});

/**
 * FIND_BUYER_PROFILE is a private api
 * a buyer profile is created in onboarding section with registerBuyer mutation
 * see onboarding_tests.js see test register buyer
 */
// node_modules/jest/bin/jest.js -t "test get buyer_profile"
it("test get buyer_profile", async () => {
  let client = await getPrivateTestClient(JWT);

  let ret = await client
    .query({
      query: FIND_BUYER_PROFILE,
      variables: { buyerId: "f3d26ef6-3666-407b-b6b5-389828487b39" },
    })
    .then((result) => result)
    .catch((err) => {
      if (typeof err !== "undefined") {
        console.log("Query error " + err);
      }
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret.data.buyerProfile));
  }
});

/**
 * UPDATE_BUYER_PROFILE is a private api
 * a buyer profile is created in onboarding section with registerBuyer mutation
 * see onboarding_tests.js see test register buyer
 */
// node_modules/jest/bin/jest.js -t "test update buyer_profile"
it("test update buyer_profile", async () => {
  let BuyerProfileRequest = {
    buyerId: "f3d26ef6-3666-407b-b6b5-389828487b39",
    userName: "updatedUserName",
    firstName: "updatedfirstName",
    lastName: "updatedlastName",
    email: "updatedEmail@up.com",
    oneClickPurchaseOn: true,
    userType: "BUYER",
    guestBuyer: false,
  };
  let client = await getPrivateTestClient(JWT);
  let ret = await client
    .mutate({
      mutation: UPDATE_BUYER_PROFILE,
      variables: { request: BuyerProfileRequest },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("mutation error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret));
  }
});

/**
 * CREATE_PAYMENT_DETAIL is a private api
 */
// PaymentDetailRequestForCreate{buyerId:ID! paymentType:PaymentType isDefaultPaymentType:Boolean
// paymentTypeDetails:String}
// node_modules/jest/bin/jest.js -t "test createPaymentDetail"
it("test createPaymentDetail", async () => {
  let PaymentDetailRequestForCreate = {
    buyerId: "f3d26ef6-3666-407b-b6b5-389828487b39",
    paymentType: "CREDIT_CARD",
    isDefaultPaymentType: true,
    paymentTypeDetails: "Visa",
  };
  let client = await getPrivateTestClient(JWT);
  let ret = await client
    .mutate({
      mutation: CREATE_PAYMENT_DETAIL,
      variables: { request: PaymentDetailRequestForCreate },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("mutation error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret));
  }
});

//+++++++++++++++++ create a register buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// node_modules/jest/bin/jest.js -t "test register buyer"
//  {"data":{"registerBuyer":{"buyerId":"f3d26ef6-3666-407b-b6b5-389828487b39","__typename":"BuyerProfileResponse"}}}
it("test register buyer", async () => {
  let BuyerProfileRequestForCreate = {
    userName: "bu3634",
    firstName: "bu363Y4",
    lastName: "bu336YR",
    geoLocation: "1.2.3.44",
    phoneNumber: "+33266300124",
    guestBuyer: false,
    email: "bu@email.com",
    userType: "BUYER",
    password: "1R2T#$6Tkop224",
    oneClickPurchaseOn: true,
    areaRegion: "",
    languages: ["EN"],
    currencies: ["EUR"],
  };
  let client = await endPointClient(url);
  let ret = await client
    .mutate({
      mutation: REGISTER_BUYER,
      variables: { request: BuyerProfileRequestForCreate },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("mutation error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret));
  }
});
