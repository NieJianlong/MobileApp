import { client } from "../App/Apollo/apolloClient";
import {
  REGISTER_BUYER,
  CREATE_GUEST_BUYER,
  UPDATE_BUYER_PROFILE,
  CREATE_PAYMENT_DETAIL,
} from "../App/Apollo/mutations/mutations_user";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

// yarn jest -t "test createGuestBuyer umu"
it("test createGuestBuyer umu", async () => {
  let BuyerProfileRequestForCreate = {
    // guestBuyer: true,
  };
  // public api
  let ret = await client
    .mutate({
      mutation: CREATE_GUEST_BUYER,
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
