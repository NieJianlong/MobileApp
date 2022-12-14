import { makeVar, gql } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

/**
 * there will be aditional logic required to handle email|phone choice
 * on user login
 */
const userProfile = {
  firstName: "",
  lastName: "",
  userId: "",
  buyerId: "",
  userName: "",
  email: "",
  isAuth: false,
  phone: "",
  addressId: "",
  addressLine1: "",
  addressLine2: "",
  billingDetailsId: "",
  billingDetails: "",
};

/**
 * items will be probably be the product object in state with some added parameters for missing
 * data from backend
 * product object will be extended with a list of variant id's (vr) and values (va)
 * for the checkout we will need the products productListing id and the variants (vr,va)
 * items[k].prodListingId and items[k].variants  for(let v of items[k].variants)
 * we also need the (guest) buyer id for the (guest) buyer checkout input
 * syntax so updates occur across diferent screens
 * const localCartVarReactive = useReactiveVar(localCartVar);
 *
 * cart is bound to buyer plus delivery address, if customer changes delivery
 * address, then products from old cart should not be available .
 */
const localCart = {
  items: [], // will be the extended product object list in localCart reactive var
  buyerId: "", // can be the guest buyer id
  deliverAddress: "", // update this on lookUpDefault address, when an address is updated. cart should be cleared
  callBackAddress: {}, // when address query  calls back add here, use for store co-ordinates ect ..., use gql mapper for now
  billingAddressDetail: {}, //  when billingaddress query  calls back add here, use for store co-ordinates ect ..., use gql mapper for now
  razorpay_payment_id: "",
  razorpay_order_id: "",
  razorpay_signature: "",
  orderNumber: "",
  orderId: "",
  amount: 0,
};

const localBuyNow = {
  items: [],
  buyerId: "",
  deliverAddress: "",
  callBackAddress: {},
};

const cartOrder = {
  orderNumber: "",
  orderId: "",
  amount: 0,
};

const razorOrderPayment = {
  razorpay_payment_id: "",
  razorpay_order_id: "",
  razorpay_signature: "",
};

export const userProfileVar = makeVar(userProfile);
export const localCartVar = makeVar(localCart);
export const cartOrderVar = makeVar(cartOrder);
export const razorOrderPaymentVar = makeVar(razorOrderPayment);
export const localBuyNowVar = makeVar(localBuyNow);

export const GET_USER_PROFILE = gql`
  query getUserProfileVar {
    userProfileVar @client
  }
`;

export const GET_LOCAL_CART = gql`
  query getLocalCartVar {
    localCartVar @client
  }
`;
export const GET_BUY_NOW_CART = gql`
  query getLocalCartVar {
    localBuyNowVar @client
  }
`;

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userProfileVar: {
          read() {
            return userProfileVar();
          },
        },
        localCartVar: {
          read() {
            return localCartVar();
          },
        },
        localBuyNowVar: {
          read() {
            return localBuyNowVar();
          },
        },
        cartOrderVar: {
          read() {
            return cartOrderVar();
          },
        },
        razorOrderPaymentVar: {
          read() {
            return razorOrderPaymentVar();
          },
        },
      },
    },
  },
});

export const runRefreshCron = async (tokenData) => {
  setInterval(() => {}, 5 * 1000); // 5 secs
};
