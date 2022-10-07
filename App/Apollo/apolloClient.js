import { ApolloClient, HttpLink, ApolloLink, concat } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import globalCache from "./cache";

import AppConfig from "../Config/AppConfig";
// const baseUrl = "http://ec2-18-189-169-167.us-east-2.compute.amazonaws.com";
//const baseUrl = "http://ec2-18-189-169-167.us-east-2.compute.amazonaws.com";
const baseUrl = AppConfig.baseUrl;
/**
 * Keycloak              --> 8080
 * IAM                   --> 8081
 * UserManagement        --> 8082
 * ProductManagement     --> 8083
 * CartManagement        --> 8084
 * OrderManagement       --> 8085
 * PaymentManagement     --> 8086
 * DeliveryManagement    --> 8087
 */
// const endpointDev = "http://10.0.2.2:8080/graphql"
// 8081 --> IAM
// 8082 --> UserManagement
// 8083 --> ProductManagement
const IAM_PORT = ":8081/graphql";
const USER_PORT = "um/graphql";
const PRODUCT_PORT = "pm/graphql";
const CART_PORT = ":8084/graphql";
const ORDER_PORT = "om/graphql";
const PAYMENT_PORT = "pay/graphql";
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
  UserProfile: USER_PORT,
  BuyerProfiles: USER_PORT,
  BuyerProfile: USER_PORT,
  CreatePaymentDetail: USER_PORT,
  UpdateBuyerProfile: USER_PORT,
  DeleteAddress: USER_PORT,
  UpdateAddress: USER_PORT,
  CoordinatesForAddressRequest: USER_PORT,
  UpdatePaymentDetail: USER_PORT,
  SendOTPCode: USER_PORT,
  ValidateCode: USER_PORT,
  SaveBuyerDevice: USER_PORT,
  NotificationPreferencesByBuyerId: USER_PORT,
  UpdateBuyerNotificationPreferences: USER_PORT,

  //product
  // ActiveProductListingsByStoreId: PRODUCT_PORT,  @Depreciated leave here for now as backend may decise roll back
  OnlineStoreByGeoCoordinates: PRODUCT_PORT,
  AnnouncementsByOnlineStore: PRODUCT_PORT,
  AnnouncementsByListingId: PRODUCT_PORT,
  GetListings: PRODUCT_PORT,
  GetPreferredCategories: PRODUCT_PORT,
  GetAllCategories: PRODUCT_PORT,
  SavePreferredCategories: PRODUCT_PORT,
  GetRelatedProducts: PRODUCT_PORT,
  AddProductToWishlist: PRODUCT_PORT,
  DeleteProductFromWishlist: PRODUCT_PORT,
  IsProductInWishlist: PRODUCT_PORT,
  IsListingAvailable: PRODUCT_PORT,
  IsListingInWishlist: PRODUCT_PORT,
  isListingInWishlist: PRODUCT_PORT,
  AddProductReview: PRODUCT_PORT,
  AddSellerReview: PRODUCT_PORT,
  AddListingToWishlist: PRODUCT_PORT,
  DeleteListingFromWishlist: PRODUCT_PORT,
  GetBuyerWishlistListing: PRODUCT_PORT,
  UpdateListingStatus: PRODUCT_PORT,
  AddReportReview: PRODUCT_PORT,
  IncrementHelpfulCount: PRODUCT_PORT,
  GetProductByProductId: PRODUCT_PORT,
  GetShowcaseListings: PRODUCT_PORT,

  // Cart
  CreateCart: CART_PORT,
  AddItem: CART_PORT,
  CartCheckout: CART_PORT,
  ClearCart: CART_PORT,

  GetBuyerOrders: ORDER_PORT,
  SearchBuyerOrders: ORDER_PORT,
  CancelOrderItem: ORDER_PORT,
  MarkOrderItemAsDelivered: ORDER_PORT,
  SubmitOrderReturnRequest: ORDER_PORT,
  TrackOrderItem: ORDER_PORT,
  GetOrderReturnStatus: ORDER_PORT,
  CreateOrderFromCart: ORDER_PORT,
  GetOrderItemDetails: ORDER_PORT,
  ValidateBuyerHasAnyOrder: ORDER_PORT,
  //Payment
  RazorpayCreateOrder: PAYMENT_PORT,
  RazorpayVerifyPaymentSignature: PAYMENT_PORT,
};

const customFetch = (uri, options) => {
  const { operationName } = JSON.parse(options.body);
  let newUri = `${uri}${allAPIS[operationName]}`;
  if (!allAPIS[operationName]) {
    //if we forget add api in allApis,there will be a mistake
    newUri = `${uri}${USER_PORT}`;
  }
  console.log("operationName====================================");
  console.log(operationName);
  console.log(newUri);
  console.log(options);

  return fetch(newUri, options);
};
const httpLink = new HttpLink({ uri: baseUrl, fetch: customFetch });
const publicHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const getClient = () => {
  // let httpLink = USER_MANAGEMENT_Link;
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add headers
    operation.setContext(({ headers = {} }) => {
      const privateHeaders = {
        Authorization: global.access_token
          ? `Bearer ${global.access_token}`
          : "",
      };
      const { isPrivate, Authorization } = headers;
      // if (isPrivate) {
      //   console.log("current token=======" + global.access_token);
      // }
      //If there is Authorization in header, it has the highest priority and is preferred to use
      if (Authorization) {
        return {
          headers: { ...publicHeaders, ...{ Authorization } },
        };
      }
      const header = isPrivate
        ? { ...publicHeaders, ...privateHeaders }
        : publicHeaders;
      return {
        headers: header,
      };
    });
    return forward(operation);
  });
  return new ApolloClient({
    cache: globalCache,
    link: concat(authMiddleware, httpLink, errorLink),
  });
};

export const client = getClient();
