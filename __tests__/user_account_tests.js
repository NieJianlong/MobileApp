import { client } from "../App/Apollo/apolloClient";
import {
  REGISTER_BUYER,
  UPDATE_BUYER_PROFILE,
  CREATE_PAYMENT_DETAIL,
} from "../App/Apollo/mutations/mutations_user";
import {
  FIND_BUYER_PROFILE,
  BUYER_PROFILE_BY_USERID,
  FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
} from "../App/Apollo/queries/queries_user";

import { runTokenFlow } from "../App/Apollo/jwt-request";

import jwt_decode from "jwt-decode";

/**
 * rest and gql api call tests
 */

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

let JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjE4MjI0NzEsImlhdCI6MTYyMTc4NjQ3MSwianRpIjoiMjJkOTMwODItMmEzZi00YmJlLWFhN2YtMzkyNzdiYzQ0ZTMzIiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiODYzYzgxNmUtZGU1MS00MWRjLThmZTAtMjg1Y2ZlYWVhOTNkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.hyfSho8Pia08G7K0ECuH6yYL8QVYgztSXN8kGcs4FkumdyresW96-GFJhOvzMe_oTx7bKVsbfISLjG8XCcUkzpyikqruPW7OgzP2mVeMZmK87sZtrD60i5bWLYdJzBXBjr7pXfwsp3upWweRPYLe3x_g8LOqoj5CP54mOjVT_G5kp2uHyaiufoVAfbL_qEV74RvcQ84llAWB-E8VHC6Q4CE0GAmeDZ0UuF7o3tn0mpKZks-8qJQZy4_ETgiYz-u6zmfRpQb7PO3ouTq4usLjoRgP6gebICHCn18R_njKcIuryqCt-O6E-FaVozHSDUDBTZfH39jk7p3DX29Ew2Xwcw";

/**
 * first login as an existing buyer to get the correct JWT token for the
 * buyers roles
 * see test register buyer
 *
 */
// yarn jest -t "makes login request ua"
it("makes login request ua", async () => {
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
    console.log(`user id =${decoded.sub}`);
  }
});

// node_modules/jest/bin/jest.js -t "test getBuyerDefaultAddressByBuyerId"
it("test getBuyerDefaultAddressByBuyerId", async () => {
  // public api
  let client = await getPrivateTestClient(JWT);
  let ret = await client
    .query({
      query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: "f3d26ef6-3666-407b-b6b5-389828487b39" },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("query error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret));
  }
});

/**
 *
 *   buyerProfileByUserId(userProfileId : ID!) : BuyerProfileResponse
 *   get userProfileId from JWT decode "sub" is userProfileId
 * 43aeaddd-de66-45bb-81aa-192f4f5e2b33
 * 12da27c8-00df-451f-b867-ee7de76ccbea
 *
 */
// yarn jest -t "test get buyerProfileByUserId"
it("test get buyerProfileByUserId", async () => {
  let ret = await client
    .query({
      query: BUYER_PROFILE_BY_USERID,
      variables: { userProfileId: "43aeaddd-de66-45bb-81aa-192f4f5e2b33" },
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
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
// yarn jest -t "test get buyer_profile"
it("test get buyer_profile", async () => {
  let ret = await client
    .query({
      query: FIND_BUYER_PROFILE,
      variables: { buyerId: "f3d26ef6-3666-407b-b6b5-389828487b39" },
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
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
// yarn jest -t "test update buyer_profile"
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
  let ret = await client
    .mutate({
      mutation: UPDATE_BUYER_PROFILE,
      variables: { request: BuyerProfileRequest },
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
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
// yarn jest -t "test createPaymentDetail"
it("test createPaymentDetail", async () => {
  let PaymentDetailRequestForCreate = {
    buyerId: "f3d26ef6-3666-407b-b6b5-389828487b39",
    paymentType: "CREDIT_CARD",
    isDefaultPaymentType: true,
    paymentTypeDetails: "",
  };
  let ret = await client
    .mutate({
      mutation: CREATE_PAYMENT_DETAIL,
      variables: { request: PaymentDetailRequestForCreate },
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
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
// yarn jest -t "test register buyer ua"
//  {"data":{"registerBuyer":{"buyerId":"f3d26ef6-3666-407b-b6b5-389828487b39","__typename":"BuyerProfileResponse"}}}
it("test register buyer ua", async () => {
  let BuyerProfileRequestForCreate = {
    userName: "bu4634",
    firstName: "bu463Y4",
    lastName: "bu336YR",
    geoLocation: "1.2.3.44",
    phoneNumber: "+334266300124",
    guestBuyer: false,
    email: "bu4@email.com",
    userType: "BUYER",
    password: "Wwwwwwww8",
    oneClickPurchaseOn: true,
    areaRegion: "",
    languages: ["EN"],
    currencies: ["EUR"],
  };
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
