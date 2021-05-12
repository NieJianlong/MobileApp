import { endPointClient } from '../App/Apollo/public-api-v3'

import {
    CREATE_ADDRESS,
    CREATE_DELIVERY_ADDRESS_GEOCOORDINATE,
    CREATE_DELIVERY_ADDRESS_TO_ONLINE_STORE,
    REGISTER_BUYER,
    CREATE_GUEST_BUYER,
    NEW_ID
} from '../App/Apollo/mutations/mutations_user'
import {
    FIND_BUYER_ADDRESS_BY_ID,
    FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
    FIND_GUEST_BUYER_ADDRESS_BY_ID,
    FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID
} from '../App/Apollo/queries/queries_user'


/**
 * rest and gql api call tests
 */
import * as jwt from '../App/Apollo/jwt-request'

import * as storage from '../App/Apollo/local-storage'

let url = 'http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8082/graphql'

jest.mock("@react-native-community/async-storage", () =>
    require("@react-native-community/async-storage/jest/async-storage-mock"),
);

/**
 * public endpoints
 * registerUser registerBuyer, createGuestBuyer registerSeller createAddress, updateAddress, deleteAddress
 * getGuestBuyerDefaultAddressByBuyerId, getGuestBuyerAddressesById
 */


//+++++++++++++++++ create a guest buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// node_modules/jest/bin/jest.js -t 'test guest buyer'
//    {"data":{"createGuestBuyer":{"buyerId":"204750d9-62cc-419d-b8e3-ac0b285c18dd","__typename":"BuyerProfileResponse"}}}
it('test guest buyer', async () => {
    let BuyerProfileRequestForCreate = {
        userName: 'buyer3',
        firstName: 'buyer33',
        lastName: 'buyer333',
        geoLocation: '1.2.3.4',
        phoneNumber: '+3331171230012',
        guestBuyer: true,
        email: 'g33buyer11@email.com', userType: 'BUYER', password: '333#$Tymkop22',
        oneClickPurchaseOn: true, areaRegion: '',
        languages: [
            "EN"
        ], currencies: [
            "EUR"
        ]
    }
    let client = await endPointClient(url)
    let ret = await client.mutate({
        mutation: CREATE_GUEST_BUYER,
        variables: { request: BuyerProfileRequestForCreate }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }
});

// node_modules/jest/bin/jest.js -t 'test guest buyer 2'
it('test guest buyer 2', async () => {
    let BuyerProfileRequestForCreate = {
        guestBuyer: true,
    }
    let client = await endPointClient(url)
    let ret = await client.mutate({
        mutation: CREATE_GUEST_BUYER,
        variables: { request: BuyerProfileRequestForCreate }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }
});



//+++++++++++++++++ create a register buyer +++++++++++++++++++
// update numbers so no xxx exists errors
// node_modules/jest/bin/jest.js -t 'test register buyer'
//       {"data":{"registerBuyer":{"buyerId":"36f9e312-a5c4-4228-a740-7ddbb2cbc88c","userId":"c8eb3595-503b-48bc-9430-50c86a633cd5","__typename":"BuyerProfileResponse"}}}
it('test register buyer', async () => {
    let BuyerProfileRequestForCreate = {
        userName: 'buyer334',
        firstName: 'buyer33Y4',
        lastName: 'buyer33YR',
        geoLocation: '1.2.3.44',
        phoneNumber: '+3321712300124',
        guestBuyer: false,
        email: 'g33Y4Rbuyer@email.com', userType: 'BUYER', password: '1R2T#$Tymkop224',
        oneClickPurchaseOn: true, areaRegion: '',
        languages: [
            "EN"
        ], currencies: [
            "EUR"
        ]
    }
    let client = await endPointClient(url)
    let ret = await client.mutate({
        mutation: REGISTER_BUYER,
        variables: { request: BuyerProfileRequestForCreate }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});


// node_modules/jest/bin/jest.js -t 'test create address'
it('test create address', async () => {

    let AddressRequestForCreate = {
        defaultAddress: true, addressType: 'SHIPPING',
        streetAddress1: 'Earth 3rd planet from sun', country: 'UK', areaCode: 'XYZ123',
        referenceId: '36f9e312-a5c4-4228-a740-7ddbb2cbc88c'
    }
    let client = await endPointClient(url)
    let ret = await client.mutate({
        mutation: CREATE_ADDRESS,
        variables: { request: AddressRequestForCreate }
    })
        .then(result => result)
        .catch(err => {
            console.log("mutation error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});

// node_modules/jest/bin/jest.js -t 'test getBuyerAddressesById'
it('test getBuyerAddressesById', async () => {
    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: FIND_BUYER_ADDRESS_BY_ID,
        variables: { buyerId: '36f9e312-a5c4-4228-a740-7ddbb2cbc88c' }
    })
        .then(result => result)
        .catch(err => {
            console.log("query error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});

// node_modules/jest/bin/jest.js -t 'test getBuyerDefaultAddressByBuyerId'
it('test getBuyerDefaultAddressByBuyerId', async () => {
    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
        variables: { buyerId: '36f9e312-a5c4-4228-a740-7ddbb2cbc88c' }
    })
        .then(result => result)
        .catch(err => {
            console.log("query error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});

// node_modules/jest/bin/jest.js -t 'test getGuestBuyerAddressesById'
it('test getGuestBuyerAddressesById', async () => {
    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: FIND_GUEST_BUYER_ADDRESS_BY_ID,
        variables: { buyerId: '204750d9-62cc-419d-b8e3-ac0b285c18dd' }
    })
        .then(result => result)
        .catch(err => {
            console.log("query error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});

// node_modules/jest/bin/jest.js -t 'test getGuestBuyerDefaultAddressByBuyerId'
it('test getGuestBuyerDefaultAddressByBuyerId', async () => {

    let client = await endPointClient(url)
    let ret = await client.query({
        query: FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
        variables: { buyerId: '204750d9-62cc-419d-b8e3-ac0b285c18dd' }
    })
        .then(result => result)
        .catch(err => {
            console.log("query error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret))
    }

});




