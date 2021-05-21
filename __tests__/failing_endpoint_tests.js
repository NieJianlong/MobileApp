import {
  CREATE_ADDRESS,
  REGISTER_BUYER,
  CREATE_PAYMENT_DETAIL,
} from "../App/Apollo/mutations/mutations_user";
import { FIND_BUYER_DEFAULT_ADDRESS_BY_ID } from "../App/Apollo/queries/queries_user";

import { runTokenFlow } from "../App/Apollo/jwt-request";
import { getPrivateTestClient } from "../App/Apollo/private-api-v3";
import { endPointClient } from "../App/Apollo/public-api-v3";

import jwt_decode from "jwt-decode";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

let url =
  "http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql";

let JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjE1Njg2NDIsImlhdCI6MTYyMTUzMjY0MiwianRpIjoiMzIyZDFhZmQtNjA4YS00MGU3LTg4MWUtN2E4OTIwOTAzMzU5IiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIxMmRhMjdjOC0wMGRmLTQ1MWYtYjg2Ny1lZTdkZTc2Y2NiZWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNTBlNzAxNjUtNTA0YS00OTZmLWE2NDgtZGE4YjZmYmJlNTU2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImVycm9yVGVzdCBlcnJvclRlc3QiLCJncm91cHMiOiJbb2ZmbGluZV9hY2Nlc3MsIHVtYV9hdXRob3JpemF0aW9uLCBidXllcl0iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlcnJvcnRlc3QiLCJnaXZlbl9uYW1lIjoiZXJyb3JUZXN0IiwiZmFtaWx5X25hbWUiOiJlcnJvclRlc3QiLCJlbWFpbCI6ImVycm9ydGVzdEBlbWFpbC5jb20ifQ.ODNPgtqk1s9JcW5t9E9Mo3pP6KpsS9-Xu1q9UcZJ96uqB-CGni53AKhZzYkvZitE4q7qf1boW3r_d7rx9XjwyDV5SUcKQ6-WqGwV2bslKQfWf3WMil_mH6jrbinYx6sGyoY12EopZTZdW3vwOvvNBmE06C2ZE6fd4HrqszcrBytgwk50UUjxmq9LW2hqDj04oMn60EIORSNNPMPefbtdTnNzg-l1WWp3AvDsrDrKoz8Q414ZFnZkUjOptelQb8Uw21zROhOjJXX7u0rHOSNDxZBsvg8QEco9x9YTKwz7ro4RFNjlv6z3TedsxmUxvyl8Ga2dtrNqvY9oKsS0lIfSoQ";

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

/**
 * second  login as an existing buyer to get the correct JWT token for the
 * buyers roles
 * see test register buyer
 *
 */
// node_modules/jest/bin/jest.js -t "makes login request fEP"
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
    console.log(decoded.sub);
  }
});

// node_modules/jest/bin/jest.js -t "test create address fep"
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

  let client = await endPointClient(url);
  let ret = await client
    .mutate({
      mutation: CREATE_ADDRESS,
      variables: { request: AddressRequestForCreate },
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

// node_modules/jest/bin/jest.js -t "test getBuyerDefaultAddressByBuyerId fep"
it("test getBuyerDefaultAddressByBuyerId fep", async () => {
  // public api
  let client = await getPrivateTestClient(JWT);
  let ret = await client
    .query({
      query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: "3d1404a7-f492-441c-aefd-02fd63e69786" },
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
