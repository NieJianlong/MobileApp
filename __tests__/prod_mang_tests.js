import { endPointClient } from '../App/Apollo/public-api-v3'
import {
    PRODUCT_LISTINGS_BY_STORE_ID, PRODUCT_BY_ID, PRODUCT_LISTING_DETAIL_RESPONSE
} from '../App/Apollo/queries/queries_prodmang'

jest.mock("@react-native-community/async-storage", () =>
    require("@react-native-community/async-storage/jest/async-storage-mock"),
);

let url = 'http://ec2-18-191-146-179.us-east-2.compute.amazonaws.com:8083/graphql'

/**
 * 
8081 --> IAM
8082 --> UserManagement
8083 --> ProductManagement


 */


// node_modules/jest/bin/jest.js -t 'test productListingsByStoreId'
it('test productListingsByStoreId', async () => {

    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: PRODUCT_LISTINGS_BY_STORE_ID,
        variables: {
            storeId: '0b950a80-7836-45b4-9ee3-42042097aafe',
            sortfield: 'wholeSalePrice',
            sortDirection: 'ASC', pageNo: 0, pageSize: 3
        }
    })
        .then(result => result)
        .catch(err => {
            console.log("query error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        console.log(JSON.stringify(ret.data.productListingsByStoreId.productListingDTOList))
        console.log(ret.data.productListingsByStoreId.productListingDTOList.length)

        let pList = []
        for (const element of ret.data.productListingsByStoreId.productListingDTOList) {
            let bag = {
                id: element.id, productId: element.productId, picture: element.photo, name: element.productName, rating: element.rating,
                ratingCount: element.numberOfReviews, wholeSalePrice: element.wholeSalePrice, retailPrice: element.retailPrice,
                percentOff: element.percentOff, deliveryDate: element.closedDate, progressBarValue: element.progressBarValue
            }
            pList.push(bag)
        }
        console.log(JSON.stringify(pList[0]))
    }

});


// node_modules/jest/bin/jest.js -t 'test productById'
it('test productById', async () => {

    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: PRODUCT_BY_ID,
        variables: { id: '564efc1f-1bfc-4b24-97c5-f35f4fd071ad' }
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

// node_modules/jest/bin/jest.js -t 'test productListingDetailResponse'
it('test productListingDetailResponse', async () => {

    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: PRODUCT_LISTING_DETAIL_RESPONSE,
        variables: { id: '564efc1f-1bfc-4b24-97c5-f35f4fd071ad' }
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