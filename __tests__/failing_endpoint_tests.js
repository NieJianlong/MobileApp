import {
  CREATE_ADDRESS,
  REGISTER_BUYER,
  CREATE_PAYMENT_DETAIL,
} from "../App/Apollo/mutations/mutations_user";
import { FIND_BUYER_DEFAULT_ADDRESS_BY_ID } from "../App/Apollo/queries/queries_user";

import { runTokenFlow } from "../App/Apollo/jwt-request";
import { client } from "../App/Apollo/apolloClient";

import jwt_decode from "jwt-decode";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

let url =
  "http://ec2-18-189-169-167.us-east-2.compute.amazonaws.com:8082/graphql";

let JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjE2NDE0OTUsImlhdCI6MTYyMTYwNTQ5NSwianRpIjoiNTEwNjkzNjctYjMxZi00MTM4LWFmODQtOGVmMjg2ZWIwYzFmIiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJjMDk4MjI4OC1jYjhjLTQ3OTEtOWYzNi1iMjA2YzdmM2JiYzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiY2NhMDJlMzUtYWMzNi00MDYxLWEyZTAtNDg0ZWFmOTBjYjY1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6InRlc3R1c3IyIHl5eXkiLCJncm91cHMiOiJbb2ZmbGluZV9hY2Nlc3MsIHVtYV9hdXRob3JpemF0aW9uLCBidXllcl0iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ6dUBlbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoidGVzdHVzcjIiLCJmYW1pbHlfbmFtZSI6Inl5eXkiLCJlbWFpbCI6Inp1QGVtYWlsLmNvbSJ9.lS3TkwP4EUaRrw53nWVCsggVAYDMrAtyyNTvrqV4MnzoNQg8cX_5d1YgD37KsOACYlINl4_2vzXwpYH-xq5fKuYyUPm7U7oqcZS-KtSQIctRncFWGXa1rbkHDoif2cCBXcAndTOvN6FTrjyagXTqtDzVO8j13n9F4ryfkaOs7GnsDc2Aoo9ZQ6gDc6NscjoAA70uyG37_ANM9vKP6ca-B-MoLipCm8wOQtRbTphX8Xj1OI1P-oRHVaYD6z-Xohn390HwyCC8XTPSvTvYoMy87PmWmILbb8mxuuo24lDf9x4Pwbt4plcCrAlRrM3YIrMBRoczhY4DoJHM7DPx319kVg";

//+++++++++++++++++ first a register buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// node_modules/jest/bin/jest.js -t "test register buyer fEP"
//  "buyerId":"3d1404a7-f492-441c-aefd-02fd63e69786"
it("test register buyer fEP", async () => {
  let BuyerProfileRequestForCreate = {
    userName: "errorTest",
    firstName: "errorTest",
    lastName: "errorTest",
    geoLocation: "1.2.3.44",
    phoneNumber: "+332688024",
    guestBuyer: false,
    email: "errorTest@email.com",
    userType: "BUYER",
    password: "Wwwwwww8",
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

/**
 * second  login as an existing buyer to get the correct JWT token for the
 * buyers roles
 * see test register buyer
 *
 */
// yarn jest -t "makes login request fEP"
it("makes login request fEP", async () => {
  let loginRequest = { username: "errorTest@email.com", password: "Wwwwwww8" };
  // let loginRequest = { username: "zu@email.com", password: "Wwwwwwww8" };
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

    console.log(decoded);
  }
});

// yarn jest -t "test create address fep"
it("test create address fep", async () => {
  let AddressRequestForCreate = {
    defaultAddress: true,
    addressType: "SHIPPING",
    flat: "flat",
    floor: "floor",
    district: "13",
    streetAddress1: "street_1",
    streetAddress2: "street_2",
    streetAddress3: "street_3",
    block: "block",
    building: "building",
    houseNumber: "11",
    villageArea: "village_area",
    provinceState: "state",
    landMark: "",
    pinCode: "1138",
    country: "UK",
    areaCode: "XYZ123",
    referenceId: "3d1404a7-f492-441c-aefd-02fd63e69786",
  };

  let AddressRequestForCreate2 = {
    pinCode: "546532",
    defaultAddress: true,
    addressType: "SHIPPING",
    provinceState: "Leeds",
    townCity: "Leeds",
    flat: "",
    villageArea: "",
    houseNumber: "",
    landMark: "",
    referenceId: "0b8ff152-5a51-48ec-b45b-96b007d24bbb",
  };

  let ret = await client
    .mutate({
      mutation: CREATE_ADDRESS,
      variables: { request: AddressRequestForCreate2 },
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

// yarn jest -t  "test getBuyerDefaultAddressByBuyerId fep"
it("test getBuyerDefaultAddressByBuyerId fep", async () => {
  // public api

  let ret = await client
    .query({
      query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: "0b8ff152-5a51-48ec-b45b-96b007d24bbb" },
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
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
