import { endPointClient } from '../App/Apollo/public-api -v3'
import { USER_PROFILES, BUYER_PROFILES } from '../App/Apollo/queries/queries_user'

jest.mock("@react-native-community/async-storage", () =>
    require("@react-native-community/async-storage/jest/async-storage-mock"),
);

let url = ' http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'

// node_modules/jest/bin/jest.js -t 'test get all buyer_profiles'
it('test get all profiles', async () => {
    let client = await endPointClient(url)

    let ret = await client.query({
        query: USER_PROFILES
    })
        .then(result => result)
        .catch(err => { console.log("Query error " + err) });

    console.log(JSON.stringify(ret))

});

it('test get all buyer_profiles', async () => {
    let client = await endPointClient(url)

    let ret = await client.query({
        query: BUYER_PROFILES
    })
        .then(result => result)
        .catch(err => { console.log("Query error " + err) });

    console.log(JSON.stringify(ret))

});


