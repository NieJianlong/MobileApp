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
    ADDRESSES,
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


/** tests for the onboarding endpoints */

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

/** test with minimal input */
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
//  {"data":{"registerBuyer":{"buyerId":"f3d26ef6-3666-407b-b6b5-389828487b39","__typename":"BuyerProfileResponse"}}}
it('test register buyer', async () => {
    let BuyerProfileRequestForCreate = {
        userName: 'bu3634',
        firstName: 'bu363Y4',
        lastName: 'bu336YR',
        geoLocation: '1.2.3.44',
        phoneNumber: '+33266300124',
        guestBuyer: false,
        email: 'bu@email.com', userType: 'BUYER', password: '1R2T#$6Tkop224',
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
// {"data":{"createAddress":{"addressId":"b105be7f-693d-41bb-a727-b301e813096a","__typename":"AddressResponse"}}}
    let AddressRequestForCreate = {
        defaultAddress: true, addressType: 'SHIPPING',flat:"flat", floor:"floor",   district:"13",
        streetAddress1:"street_1", streetAddress2:"street_2",streetAddress3:"street_3",
        block:"block",  building:"building", houseNumber:"11", villageArea:"village_area", 
        provinceState:"state", landMark:'', pinCode:"1138",
        streetAddress1: '', country: 'UK', areaCode: 'XYZ123',
        referenceId: '98ecb643-a64c-469d-99c7-fd559d244019'
    }

    let AddressRequestForCreate2 = {
        defaultAddress: true, addressType: 'SHIPPING', 
        provinceState:"state", pinCode:"1138",
        referenceId: '98ecb643-a64c-469d-99c7-fd559d244019'
    }
    let client = await endPointClient(url)
    let ret = await client.mutate({
        mutation: CREATE_ADDRESS,
        variables: { request: AddressRequestForCreate2 }
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






// node_modules/jest/bin/jest.js -t 'test getGuestBuyerAddressesById'
it('test getGuestBuyerAddressesById', async () => {
    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: FIND_GUEST_BUYER_ADDRESS_BY_ID,
        variables: { buyerId: '3c48548f-9a81-4b83-8f6a-9bd6885df231' }
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
//     referenceId: '98ecb643-a64c-469d-99c7-fd559d244019'
    let client = await endPointClient(url)
    let ret = await client.query({
        query: FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
        variables: { buyerId: 'a89b217a-7d51-4a31-9158-3a1e27857f9a' }
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




