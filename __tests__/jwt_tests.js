import { runTokenFlow, runRefreshTokenFlow } from "../App/Apollo/jwt-request";
import { parseTokenData } from "../App/Apollo/mixins";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);
/**
 * tests for developing the code associated with the JWT token attributes
 */

// node_modules/jest/bin/jest.js -t "parse login request"
it("parse login request", async () => {
  let loginRequest = { username: "bu@email.com", password: "1R2T#$6Tkop224" };
  let ret = await runTokenFlow(loginRequest);
  // for (const key in ret) {
  //     console.log(`${key}: ${ret[key]}`);
  // }
  if (typeof ret !== "undefined") {
    let tokenData = parseTokenData(ret.data);
    console.log(`${JSON.stringify(tokenData)}`);

    // console.log(`${ ret.data.access_token}`)
    // console.log(`id_token\n ${ ret.data.id_token}`)
    //   console.log(`refresh_token\n ${ ret.data.refresh_token}`)
  }
});

// node_modules/jest/bin/jest.js -t "makes refresh token request"
it("makes refresh token request", async () => {
  let r_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1ZDkxOGJlMy03NjhiLTQ5N2UtODFmMy00OTI4NjE3ZDI5M2EifQ.eyJleHAiOjE2MjExMDQ1NDcsImlhdCI6MTYyMTEwMjc0NywianRpIjoiZjU5ZGQ1MDItNzVjNi00MWYzLWE5NzEtOTY1MmM0Njc2YTU4IiwiaXNzIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwiYXVkIjoiaHR0cDovL2lwLTE3Mi0zMS0yMi0xNzUudXMtZWFzdC0yLmNvbXB1dGUuaW50ZXJuYWw6ODA4MC9hdXRoL3JlYWxtcy9zYWxhbWlzbGljaW5nIiwic3ViIjoiNDNhZWFkZGQtZGU2Ni00NWJiLTgxYWEtMTkyZjRmNWUyYjMzIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImlhbS1rZXljbG9hay1wcm94eS1zZXJ2aWNlLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI1YWNjMmM1MS0yMjgyLTRmYmUtOWFmZS1jMTRkY2UxMzgzMGEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.qjyUdRScKBrmn06o-v3WGV8zI6dZ_w0F-MgIUSUZHog";
  let ret = await runRefreshTokenFlow(r_token);
  // for (const key in ret) {
  //     console.log(`${key}: ${ret[key]}`);
  // }
  if (typeof ret !== "undefined") {
    console.log(`${JSON.stringify(ret.data)}`);
    //   console.log(`refresh_token\n ${ ret.data.refresh_token}`)
  }
});
