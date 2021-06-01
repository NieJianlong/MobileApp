import { client } from "../App/Apollo/apolloClient";
import {
  CREATE_CART,
  ADD_ITEM,
  CLEAR_CART,
  CART_CHECKOUT,
} from "../App/Apollo/mutations/mutations_cart";
import { FIND_BUYER_DEFAULT_ADDRESS_BY_ID } from "../App/Apollo/queries/queries_user";
import { BUYER_PROFILE_BY_USERID } from "../App/Apollo/queries/queries_user";

import { runTokenFlow } from "../App/Apollo/jwt-request";

import jwt_decode from "jwt-decode";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

const JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIVEJHb2dMZnA3Q2F3T1FMRmlNUm9QeGRJaVFXV0pXRThvNnZPMy1kcE1rIn0.eyJleHAiOjE2MjI1MDExNTcsImlhdCI6MTYyMjQ2NTE1NywianRpIjoiZDlmZDU2OWMtMDFlYy00MDc4LTg5YmItNjVlMTM5YmEzZDE1IiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjpbInVzZXItbWFuYWdlbWVudCIsImFwaS1nYXRld2F5IiwicHJvZHVjdC1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiI0M2FlYWRkZC1kZTY2LTQ1YmItODFhYS0xOTJmNGY1ZTJiMzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpYW0ta2V5Y2xvYWstcHJveHktc2VydmljZS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNWYwNGM1ZWUtODVmYS00Zjc1LWE4MmUtZjQxNDA0OTM2Y2ZiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJidXllciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InVzZXItbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYXBpLWdhdGV3YXkiOnsicm9sZXMiOlsiYnV5ZXIiXX0sInByb2R1Y3QtbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJidXllciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImJ1MzYzWTQgYnUzMzZZUiIsImdyb3VwcyI6IltvZmZsaW5lX2FjY2VzcywgdW1hX2F1dGhvcml6YXRpb24sIGJ1eWVyXSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJ1MzYzNCIsImdpdmVuX25hbWUiOiJidTM2M1k0IiwiZmFtaWx5X25hbWUiOiJidTMzNllSIiwiZW1haWwiOiJidUBlbWFpbC5jb20ifQ.jIvjzxT5dVoqr85B2STPI8e3nu00cPlnhojwG1eIyhfsYG13SbWCMSxsiYTX2QOABBysz-XfPrAW0hJ2EvMZKY5vNoI1BqGHwlfnTMPMLTuVFC63npiNEW7DwfTbRVil-x3rlyDjJ7G47qa09Xo4RTl6sCCOWYa-k60AjKwRvr2F67BsUd7y5zf1Wa3nW1RZ6m290cBUV4FlapHprnQbMQc5QDs1iBzqpZ__tlAhharcvYrhifhf2OlFem-fscRhUleyriTozuKeNJIOVre_v0ZEabrQOTaiYMuEBsG6AudZZY6cEYjX9yguCmRud4yS3cBOgQjxphkiZaW8y-SkOA";

// yarn jest -t "makes login request cm"
// data for follow on tests
// "buyerId":"f3d26ef6-3666-407b-b6b5-389828487b39"
it("makes login request cm", async () => {
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

    await client
      .query({
        query: BUYER_PROFILE_BY_USERID,
        variables: { userProfileId: decoded.sub },
        context: {
          headers: {
            isPrivate: true,
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      })
      .then((result) => {
        if (typeof result.data !== "undefined") {
          console.log(
            `Login BUYER_PROFILE_BY_USERID look up buyerId calls back ${JSON.stringify(
              result.data
            )}`
          );
          if (result.data.buyerProfileByUserId.buyerId === null) {
            console.log("found null GuestBuyer buyerId");
          } else {
            console.log(
              `Login BUYER_PROFILE_BY_USERID found buyerId ${result.data.buyerProfileByUserId.buyerId}`
            );
          }
        } else {
          console.log("Login BUYER_PROFILE_BY_USERID server error");
        }
      })
      .catch((err) => {
        if (typeof err !== "undefined") {
          console.log("Login BUYER_PROFILE_BY_USERID Query error " + err);
        }
      });
  }
});

/**
 * get the correct JWT for the buyer id below
 */

/**
 * check the addressId exists and is correct for the buyer idf or the cart tests
 *
 */
// yarn jest -t  "test getBuyerDefaultAddressByBuyerId cm"
// use inputs above bid f3d26ef6-3666-407b-b6b5-389828487b39
// should return "addressId":"85923594-64d7-4389-9473-61e8642b5dbf"
it("test getBuyerDefaultAddressByBuyerId cm", async () => {
  // public api

  let ret = await client
    .query({
      query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
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
      console.log("query error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret));
  }
});

// yarn jest -t "test create cart cm"
//  {"data":{"createCart":{"id":"1965b05e-d75c-49ef-8c97-d71329d30081","__typename":"Cart"}}}
it("test create cart cm", async () => {
  let ret = await client
    .mutate({
      mutation: CREATE_CART,
      variables: {
        buyerID: "f3d26ef6-3666-407b-b6b5-389828487b39",
        deliveryAddress: "85923594-64d7-4389-9473-61e8642b5dbf",
      },
      context: {
        headers: {
          isPrivate: false,
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

// yarn jest -t "test add item cm"
it("test add item cm", async () => {
  let ret = await client
    .mutate({
      mutation: ADD_ITEM,
      variables: {
        cartID: "1965b05e-d75c-49ef-8c97-d71329d30081",
        productListingID: "b856b06f-8021-49d2-b02e-06e3f9f9970e",
        quantity: 1,
        shippingMethod: "DELIVERY_ADDRESS",
      },
      context: {
        headers: {
          isPrivate: false,
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

// yarn jest -t "test checkout cart cm"
it("test checkout cart cm", async () => {
  let ret = await client
    .mutate({
      mutation: CART_CHECKOUT,
      variables: {
        cartID: "1965b05e-d75c-49ef-8c97-d71329d30081",
        homeDelivery: true,
      },
      context: {
        headers: {
          isPrivate: false,
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

// yarn jest -t "test clear cart cm"
it("test clear cart cm", async () => {
  let ret = await client
    .mutate({
      mutation: CLEAR_CART,
      variables: {
        cartID: "1965b05e-d75c-49ef-8c97-d71329d30081",
      },
      context: {
        headers: {
          isPrivate: false,
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
