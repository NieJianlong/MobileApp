import { client } from "../App/Apollo/apolloClient";
//
import {
  CREATE_DELIVERY_ADDRESS_GEOCOORDINATE,
  CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
} from "../App/Apollo/mutations/mutations_user";

import {
  FIND_BUYER_ADDRESS_BY_ID,
  FIND_BUYER_PROFILE,
  FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
  FIND_GUEST_BUYER_ADDRESS_BY_ID,
  FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
} from "../App/Apollo/queries/queries_user";

/**
 * rest and gql api call tests
 */
import * as jwt from "../App/Apollo/jwt-request";

import * as storage from "../App/Apollo/local-storage";
import { runTokenFlow } from "../App/Apollo/jwt-request";

let JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjIyMTg4OTUsImlhdCI6MTYyMjE4Mjg5NSwianRpIjoiYzU5MzhhYzktMWNlZi00MmI3LTk4YmYtYjVlNDBiNWExYjBjIiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiMWE0MzVlOTgtMzc0NC00Yjc0LTg4ZjAtZjkzYmRmNmJmMTA2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.eBEy4bw7sjityaitJStjGP0TCLu2J_YkZtaK-SQFDRYoabiyqKdmgpdLpH56v1l4Vr2Jf240wZpJwdL2s79Nd0MxOVEBQz2qZHu-AdAk19geryA-NVGGheh7DTTStHDSJqOeHem3kvDMi8RZQtdRtknIs7-CmPUkReo_zHjdjSBWERoWTwuAGvONIYzT24O-GUIUfNjDHXOTY9joxA2iNHyzXh_ggcbrQ1Ay3_v9NdAzDSBu3sJ9aCuMwlXc06S1UPW0Fbu98sbEDp8qjoGJpFosvEjBRGaJlTLzeK3sc4ESBfjfHvgUCBs6jOvd5S24yQ8oj_ciGTChN4eTR-Qkrw";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
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
// yarn jest -t "makes login request"
it("makes login request", async () => {
  let loginRequest = { username: "du@email.com", password: "12RR#Wwwwwww8" };
  let ret = await runTokenFlow(loginRequest);
  // for (const key in ret) {
  //     console.log(`${key}: ${ret[key]}`);
  // }
  if (typeof ret !== "undefined") {
    console.log(`${ret.data.access_token}`);
    // console.log(`id_token\n ${ ret.data.id_token}`)
    // console.log(`refresh_token\n ${ ret.data.refresh_token}`)
  }
});

// yarn jest -t "test getBuyerAddressesById"
it("test getBuyerAddressesById", async () => {
  // public api
  let ret = await client
    .query({
      query: FIND_BUYER_ADDRESS_BY_ID,
      variables: { buyerId: "36f9e312-a5c4-4228-a740-7ddbb2cbc88c" },
      context: {
        headers: {
          isPrivate: true,
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

// yarn jest -t "test getBuyerDefaultAddressByBuyerId"
it("test getBuyerDefaultAddressByBuyerId", async () => {
  // public api
  let ret = await client
    .query({
      query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: "99264247-c58c-4a77-bb61-559b6226db2c" },
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

/**
 * CREATE_DELIVERY_ADDRESS_GEOCOORDINATE is a private api
 */
// yarn jest -t "test create createDeliveryAddressGeoCoordinate"
it("test create createDeliveryAddressGeoCoordinate", async () => {
  let PointRequest = { x: 1.2, y: 1.3 };
  let DeliveryAddressGeoCoordinateRequest = {
    addressId: "NEW_ID",
    coordinates: PointRequest,
  };
  let ret = await client
    .mutate({
      mutation: CREATE_DELIVERY_ADDRESS_GEOCOORDINATE,
      variables: { request: DeliveryAddressGeoCoordinateRequest },
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
    console.log(JSON.stringify(ret.data));
  }
});

/**
 *   mutation: CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
 is a private api
 */
//  yarn jest -t "test create createDeliveryAddressToOnlineStore"
it("test create createDeliveryAddressToOnlineStore", async () => {
  let DeliveryAddressToOnlineStoreRequestForCreate = {
    addressId: "NEW_ID",
    storeId: "NEW_ID",
  };
  let ret = await client
    .mutate({
      mutation: CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
      variables: { request: DeliveryAddressToOnlineStoreRequestForCreate },
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
    console.log(JSON.stringify(ret.data));
  }
});
// yarn jest -t "test getuser profile"
it("test getuser profile", async () => {
  let ret = await client
    .query({
      query: USER_PROFILES,
      variables: {},
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(ret);
  }
});
// yarn jest -t "test BUYER_PROFILES"
it("test BUYER_PROFILES", async () => {
  let ret = await client
    .query({
      query: BUYER_PROFILES,
      variables: {},
      context: {
        headers: {
          isPrivate: true,
          Authorization: `Bearer ${JWT}`,
        },
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(ret);
  }
});
