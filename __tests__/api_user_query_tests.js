import { endPointClient } from '../App/Apollo/public-api-v3'
import { USER_PROFILES, 
         BUYER_PROFILES,
         FIND_BUYER_ADDRESS_BY_ID } from '../App/Apollo/queries/queries_user'

jest.mock("@react-native-community/async-storage", () =>
    require("@react-native-community/async-storage/jest/async-storage-mock"),
);

let url = ' http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'

// node_modules/jest/bin/jest.js -t 'test get all addresses'
it('test get all addresses', async () => {
    let client = await endPointClient(url)

    let ret = await client.query({
        query: FIND_BUYER_ADDRESS_BY_ID,
        variables: {buyerId: 'ad2e7afd-93fb-4b1a-84c0-6f7249437182'}
    })
        .then(result => result)
        .catch(err => { console.log("Query error " + err) });

    console.log(JSON.stringify(ret))

});


// node_modules/jest/bin/jest.js -t 'test get all profiles'
// internal use only
// it('test get all profiles', async () => {
//     let client = await endPointClient(url)

//     let ret = await client.query({
//         query: USER_PROFILES
//     })
//         .then(result => result)
//         .catch(err => { console.log("Query error " + err) });

//     console.log(JSON.stringify(ret))

// });

it('test get all buyer_profiles', async () => {
    let client = await endPointClient(url)

    let ret = await client.query({
        query: BUYER_PROFILES
    })
        .then(result => result)
        .catch(err => { console.log("Query error " + err) });

    console.log(JSON.stringify(ret))

});



