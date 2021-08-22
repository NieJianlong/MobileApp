import axios from "axios";
import * as localStorage from "./local-storage";
import AppConfig from "../Config/AppConfig";
/**
 * we first obtain the jwt, then store in localstorage, then
 * private appoloo client will read from local strogae for auth requests
 *
 */
const LOGIN_ENDPOINT = `${AppConfig.baseUrl}:8081/api/sso/authentication/login`;

// Axios automatically serialize object to JSON
export const runTokenFlow = async (loginRequest) => {
  let ret = await axios
    .post(LOGIN_ENDPOINT, loginRequest, {
      headers: { "Content-Type": "application/json", accept: "*/*" },
    })
    .then((ret) => ret)
    .catch((err) => {
      console.log(`${err}`);
      // to do error conditions
    });

  //  await localStorage.setLocalStorageValue(ret)

  return ret;
};

// Axios automatically serialize object to JSON
export const runRefreshTokenFlow = async (token) => {
  let loginRequest = { username: "massimo.03", password: "massimo.03" };

  let ret = await axios
    .post(LOGIN_ENDPOINT, loginRequest, {
      headers: {
        "Content-Type": "application/json",
        "Refresh-Token": token,
        accept: "*/*",
      },
    })
    .then((ret) => ret)
    .catch((err) => {
      console.log(`${err}`);
      // to do error conditions
    });

  await localStorage.setLocalStorageValue(ret);

  return ret;
};

// mock api testing
export const runMockTokenFlow = async (userId, password) => {
  let loginRequest = { name: userId, password: password };
  let headers = { "Content-Type": "application/json" };

  let ret = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("somejwt");
    }, 300);
  });

  return ret;
};

export const runMockRegisterFlow = async (regUser) => {
  let headers = { "Content-Type": "application/json" };

  let MockRegisterJsonReponse = "{'registerOk':'OK'}";

  let ret = new Promise((resolve, reject) => {
    console.log(JSON.stringify(regUser));
    setTimeout(() => {
      resolve(MockRegisterJsonReponse);
    }, 300);
  });

  return ret;
};

export const runMockOTPFlow = async (otpCode) => {
  let headers = { "Content-Type": "application/json" };

  let MockOTPJsonReponse = { validateOK: "OK" };

  let ret = new Promise((resolve, reject) => {
    console.log(JSON.stringify(otpCode));
    setTimeout(() => {
      resolve(MockOTPJsonReponse);
    }, 300);
  });

  return ret;
};

export const runMockGetProductList = async () => {
  let headers = { "Content-Type": "application/json" };

  let MockProductListJsonReponse = { productList: JSON.stringify(products) };

  let ret = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MockProductListJsonReponse);
    }, 300);
  });

  return ret;
};

const products = [
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 4.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
  {
    name: "iPhone 11",
    picture:
      "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: "22/12/2020",
    inStock: 100,
    orderCount: 24,
  },
];
