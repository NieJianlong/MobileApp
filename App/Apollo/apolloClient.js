import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import globalCache from "./cache";
/**
 * need fetch as we are not in a browser
 */
import fetch from "cross-fetch";
const baseUrl = "http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com";

// const endpointDev = "http://10.0.2.2:8080/graphql"
// 8081 --> IAM
// 8082 --> UserManagement
// 8083 --> ProductManagement
const IAM_PORT = ":8081/graphql";
const USER_PORT = ":8082/graphql";
const PRODUCT_PORT = ":8083/graphql";

//we should add all apis here,
const allAPIS = {
  //public api
  CreateGuestBuyer: USER_PORT,
  GetBuyerDefaultAddressByBuyerId: USER_PORT,
  RegisterBuyer: USER_PORT,
  CreateAddress: USER_PORT,
  GetGuestBuyerAddressesById: USER_PORT,
  GetGuestBuyerDefaultAddressByBuyerId: USER_PORT,
  GetBuyerAddressesById: USER_PORT,
  BuyerProfileByUserId: USER_PORT,
  CreateDeliveryAddressGeoCoordinate: USER_PORT,
  CreateDeliveryAddressToOnlineStore: USER_PORT,
  UserProfiles: USER_PORT,
  BuyerProfiles: USER_PORT,
  BuyerProfile: USER_PORT,
  CreatePaymentDetail: USER_PORT,
  UpdateBuyerProfile: USER_PORT,
  //product
  ActiveProductListingsByStoreId: PRODUCT_PORT,
};

const customFetch = (uri, options) => {
  const { operationName } = JSON.parse(options.body);
  let newUri = `${uri}${allAPIS[operationName]}`;
  if (!newUri) {
    //if we forget add api in allApis,there will be a mistake
    newUri = USER_PORT;
  }
  return fetch(newUri, options);
};

const httpLink = new HttpLink({ uri: baseUrl, fetch: customFetch });
const publicHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const privateHeaders = {
  Authorization: global.access_token ? `Bearer ${global.access_token}` : "",
};
const getClient = () => {
  // let httpLink = USER_MANAGEMENT_Link;
  const authMiddleware = new ApolloLink((operation, forward) => {
    console.log(forward);
    console.log(operation);
    // add headers
    operation.setContext(({ headers = {} }) => {
      const { isPrivate, Authorization } = headers;
      //If there is Authorization in header, it has the highest priority and is preferred to use
      if (Authorization) {
        return {
          headers: { ...publicHeaders, ...{ Authorization } },
        };
      }
      return {
        headers: isPrivate
          ? { ...publicHeaders, ...privateHeaders }
          : publicHeaders,
      };
    });
    return forward(operation);
  });
  return new ApolloClient({
    cache: globalCache,
    link: concat(authMiddleware, httpLink),
  });
};

export const client = getClient();
