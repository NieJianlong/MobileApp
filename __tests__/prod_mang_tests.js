import { client } from "../App/Apollo/apolloClient";
import {
  ACTIVE_PRODUCT_LISTINGS_BY_STORE_ID,
  PRODUCT_BY_ID,
  PRODUCT_LISTING_DETAIL_RESPONSE,
  ANNOUNCEMENTS_BY_ONLINE_STORE,
  ANNOUNCEMENT_BY_PRODUCT_LISTING,
  ANNOUNCEMENT_BY_LISTING_ID,
} from "../App/Apollo/queries/queries_prodmang";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

/**
 *
8081 --> IAM
8082 --> UserManagement
8083 --> ProductManagement

 get coordinates from UserManagement by delivery address as string and then pass them to ProductManagement

 */

// yarn jest -t "test activeProductListingsByStoreId pm"
it("test activeProductListingsByStoreId pm", async () => {
  // public api
  let ret = await client
    .query({
      query: ACTIVE_PRODUCT_LISTINGS_BY_STORE_ID,
      variables: {
        storeId: "0b950a80-7836-45b4-9ee3-42042097aafe",
        sortfield: "wholeSalePrice",
        sortDirection: "ASCENDING",
        pageNo: 0,
        pageSize: 3,
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("query error" + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret.data));
    // console.log(ret.data.activeProductListingsByStoreId.length);

    // let pList = [];
    // for (const element of ret.data.activeProductListingsByStoreId) {
    //   let bag = {
    //     id: element.id,
    //     productId: element.productId,
    //     picture: element.photo,
    //     name: element.productName,
    //     rating: element.rating,
    //     ratingCount: element.numberOfReviews,
    //     wholeSalePrice: element.wholeSalePrice,
    //     retailPrice: element.retailPrice,
    //     percentOff: element.percentOff,
    //     deliveryDate: element.closedDate,
    //     progressBarValue: element.progressBarValue,
    //   };
    //   pList.push(bag);
    // }
    // console.log(JSON.stringify(pList[0]));
  }
});

// yarn jest -t "test announcementsByOnlineStore"
it("test announcementsByOnlineStore", async () => {
  // public api
  let ret = await client
    .query({
      query: ANNOUNCEMENTS_BY_ONLINE_STORE,
      variables: {
        storeId: "0b950a80-7836-45b4-9ee3-42042097aafe",
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("query error" + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret.data.announcementsByOnlineStore));
  }
});

// yarn jest -t "test productById"
it("test productById", async () => {
  // public api
  let ret = await client
    .query({
      query: PRODUCT_BY_ID,
      variables: { id: "564efc1f-1bfc-4b24-97c5-f35f4fd071ad" },
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

// yarn jest -t "test productListingDetailResponse"
it("test productListingDetailResponse", async () => {
  // public api
  let ret = await client
    .query({
      query: PRODUCT_LISTING_DETAIL_RESPONSE,
      variables: { id: "564efc1f-1bfc-4b24-97c5-f35f4fd071ad" },
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

// yarn jest -t "test announcementsByListingId"
it("test announcementsByListingId", async () => {
  // public api
  let ret = await client
    .query({
      query: ANNOUNCEMENT_BY_LISTING_ID,
      variables: {
        productListingId: "f968e892-328a-450d-9b2b-0d7604152c85",
      },
      context: {
        headers: {
          isPrivate: false,
        },
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("query error" + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(JSON.stringify(ret.data.announcementsByListingId));
  }
});
