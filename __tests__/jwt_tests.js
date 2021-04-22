import { runTokenFlow } from '../App/Apollo/jwt-request'

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock"),
);


it('makes login request', async () => {
    let ret = await runTokenFlow()
    // for (const key in ret) {
    //     console.log(`${key}: ${ret[key]}`);
    // }

    console.log(`${ret.data}`)
});