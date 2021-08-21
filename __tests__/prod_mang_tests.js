import { client } from "../App/Apollo/apolloClient";
import {
  ACTIVE_PRODUCT_LISTINGS_BY_STORE_ID,
  PRODUCT_BY_ID,
  PRODUCT_LISTING_DETAIL_RESPONSE,
  ANNOUNCEMENTS_BY_ONLINE_STORE,
  ANNOUNCEMENT_BY_LISTING_ID,
  GET_LISTINGS,
} from "../App/Apollo/queries/queries_prodmang";

import { FIND_COORDINATES_FOR_ADDRESS_REQUEST } from "../App/Apollo/queries/queries_user";

//

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

/**
 *
8081 --> IAM
8082 --> UserManagement
8083 --> ProductManagement

get-graphql-schema  http://ec2-18-189-169-167.us-east-2.compute.amazonaws.com:8083/graphql > schemaPM.json
 */

//
// yarn jest -t "test callBackAddressCords pm"
it("test callBackAddressCords pm", async () => {
  let ret = await client
    .query({
      query: FIND_COORDINATES_FOR_ADDRESS_REQUEST,
      variables: {
        address: {
          pinCode: "985674",
          provinceState: "Foolis Place",
          townCity: "Foolis Place",
          villageArea: "Foolis Place",
          flatNumber: "25",
        },
      },
      context: {
        headers: {
          isPrivate: false,
        },
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("query error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(`CoordinateResponse ${JSON.stringify(ret)}`);
  }
});

//
// yarn jest -t "test getListings pm"
/**
 * {"__typename":"ProductListingView","productId":"3b58bc68-c42b-49a9-8743-af7c442dd88b",
 * "numberOfReviews":0,"rating":5,"closedDate":"2021-08-08","deliveryDate":"2021-03-09",
 * "productListingType":"MAIN_PRODUCT_LISTING","shippingMethodsAvailable":null,"noOfOrderedItems":0,
 * "progressBarValue":0,"noOfItemsInStock":58,"numberOfItemsAvailable":58,"minQuantityPerCart":null,
 * "maxQuantityPerCart":30,"pickUpFromSeller":null,"amountSaved":null,"deliveryFee":null,
 * "shortName":"Eternity NITRO","longName":"Eternity NITRO Women's Running Shoes",
 * "description":"Let...","technicalDetails":"{ }","announcementId":"36eb1817-6ced-4df8-b938-621d945a0c38",
 * "collectionPointAddressId":null,"relatedProducts":null,"sellerId":"3940fe30-8b1a-49f6-93ee-b12ca88d5eb3",
 * "retailPrice":null,"wholeSalePrice":null,"percentOff":null,"photo":null,
 * "photoUrls":["https://salamislicing-images.s3.us-east-2.amazonaws.com/3b58bc68-c42b-49a9-8743-af7c442dd88b-M.png"],
 * "seller":{"__typename":"SellerView","id":"3940fe30-8b1a-49f6-93ee-b12ca88d5eb3",
 *        "brandName":"od tempor i","ratingCount":4},"images":[{"__typename":"Images",
 *        "id":"092baf30-7d31-11eb-9439-0242ac130002","referenceId":"3b58bc68-c42b-49a9-8743-af7c442dd88b",
 *        "imageName":"3b58bc68-c42b-49a9-8743-af7c442dd88b-M.png","imageType":"PNG","description":"desc",
 *        "fullPath":"https://salamislicing-images.s3.us-east-2.amazonaws.com/3b58bc68-c42b-49a9-8743-af7c442dd88b-M.png"}],
 * "productListingsOptionGroups":[],
 * "variants":[]}
 */
it("test getListings pm", async () => {
  let ret = await client
    .query({
      query: GET_LISTINGS,
      variables: {
        searchOptions: {
          filter: "ACTIVE_BY_COORDINATES",
          filterParams: { latitude: 1.5, longitude: 1.5 },
          pageNo: 1,
          pageSize: 3,
        },
      },
      context: {
        headers: {
          isPrivate: false,
        },
      },
    })
    .then((result) => result)
    .catch((err) => {
      console.log("query error " + err);
      return;
    });

  if (typeof ret !== "undefined") {
    console.log(`num of ProductListingView ${ret.data.getListings.length}`);
    for (let p of ret.data.getListings) {
      // console.log(`ProductListingView ${JSON.stringify(p)}`);
      // console.log(`name ${p.longName}`);
      // let b = JSON.parse(p.highlightBullets);
      // b.map((bul, index) => {
      //   console.log(`bul ${bul}`);
      // });
      if (p.returnPolicies.length > 0) {
        let rpn = p.returnPolicies.name;
        let rpd = p.returnPolicies.description;
      }

      // console.log(`name ${rpn} description ${rpd}`);
      //console.log(`ProductListingView ${JSON.stringify(p)}`);
      // console.log(
      //   `collectionPointAddressId is null? ${p.collectionPointAddressId}`
      // );
      // if (p.seller) {
      //   console.log(
      //     `seller ${p.seller.id} ${p.seller.businessName}  ${p.usersRating}`
      //   );
      // }
      // if (p.collectionPointAddressId === null) {
      //   console.log("hide pick up from seller");
      // }
      // console.log(`description? ${p.description}`);
      // for (let optGroups of p.productListingsOptionGroups) {
      //   let optG = optGroups.optionsGroup;
      //   console.log(`optionsGroup Id == ${optG.groupId}`);
      //   console.log(`optionsGroup name == ${optG.name}`);
      //   console.log(`optionsGroup description == ${optG.description}`);
      //   let optionValues = optG.optionValues;
      //   for (let oValView of optionValues) {
      //     console.log(`option Value == ${oValView.value}`);
      //     console.log(
      //       `option defaultOptionValue == ${oValView.defaultOptionValue}`
      //     );
      //     console.log(`option name == ${oValView.name}`);
      //   }
      // }
    }
  }
});

// @Depreciated
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

//  @Depreciated
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
