import { client } from "../App/Apollo/apolloClient";
import {
  CREATE_ADDRESS,
  REGISTER_BUYER,
  CREATE_GUEST_BUYER,
} from "../App/Apollo/mutations/mutations_user";
import {
  FIND_GUEST_BUYER_ADDRESS_BY_ID,
  FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
} from "../App/Apollo/queries/queries_user";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

/** tests for the onboarding endpoints */

//+++++++++++++++++ create a guest buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// yarn jest -t "test guest buyer"
//    {"data":{"createGuestBuyer":{"buyerId":"204750d9-62cc-419d-b8e3-ac0b285c18dd","__typename":"BuyerProfileResponse"}}}
it("test guest buyer", async () => {
  let BuyerProfileRequestForCreate = {
    userName: "buyer3",
    firstName: "buyer33",
    lastName: "buyer333",
    geoLocation: "1.2.3.4",
    phoneNumber: "+3331171230012",
    guestBuyer: true,
    email: "g33buyer11@email.com",
    userType: "BUYER",
    password: "333#$Tymkop22",
    oneClickPurchaseOn: true,
    areaRegion: "",
    languages: ["EN"],
    currencies: ["EUR"],
  };
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
    console.log("success" + JSON.stringify(ret));
  }
});

/** test with minimal input */
// yarn jest -t "test guest buyer 2"
it("test guest buyer 2", async () => {
  let BuyerProfileRequestForCreate = {
    guestBuyer: true,
  };
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

//+++++++++++++++++ create a register buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// yarn jest -t "test register buyer"
//  {"data":{"registerBuyer":{"buyerId":"c4f06cac-3661-408f-9d04-af3f7090c6db","__typename":"BuyerProfileResponse"}}}
it("test register buyer", async () => {
  let BuyerProfileRequestForCreate = {
    userName: "cu36341",
    firstName: "cu363Y4",
    lastName: "cu336YR",
    geoLocation: "1.2.3.44",
    phoneNumber: "+332267700124",
    guestBuyer: false,
    email: "cu11@email.com",
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

// yarn jest -t "test create address"
it("test create address", async () => {
  // {"data":{"createAddress":{"addressId":"b105be7f-693d-41bb-a727-b301e813096a","__typename":"AddressResponse"}}}
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
    referenceId: "f3d26ef6-3666-407b-b6b5-389828487b39",
  };

  let AddressRequestForCreate2 = {
    defaultAddress: true,
    addressType: "SHIPPING",
    provinceState: "state",
    pinCode: "1138",
    referenceId: "98ecb643-a64c-469d-99c7-fd559d244019",
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

// yarn jest -t "test getGuestBuyerAddressesById"
it("test getGuestBuyerAddressesById", async () => {
  // public api
  let ret = await client
    .query({
      query: FIND_GUEST_BUYER_ADDRESS_BY_ID,
      variables: { buyerId: "99264247-c58c-4a77-bb61-559b6226db2c" },
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

// yarn jest -t "test getGuestBuyerDefaultAddressByBuyerId"
it("test getGuestBuyerDefaultAddressByBuyerId", async () => {
  //     referenceId: "98ecb643-a64c-469d-99c7-fd559d244019"
  let ret = await client
    .query({
      query: FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: "a89b217a-7d51-4a31-9158-3a1e27857f9a" },
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
