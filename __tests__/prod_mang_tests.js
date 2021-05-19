import { endPointClient } from '../App/Apollo/public-api-v3'
import {
    ALL_PRODUCT_LISTINGS_DTO, PRODUCT_BY_ID, PRODUCT_LISTING_DETAIL_RESPONSE
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

// node_modules/jest/bin/jest.js -t 'test allProductListingsDTO'
it('test allProductListingsDTO', async () => {

    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: ALL_PRODUCT_LISTINGS_DTO,
        variables: { sortfield: 'wholeSalePrice', sortDirection:'DESC', pageNo: 0, pageSize: 6  }
    })
        .then(result => result)
        .catch(err => {
            console.log("query error " + err)
            return
        });

    if (typeof ret !== 'undefined') {
        // console.log(JSON.stringify(ret))
        console.log(ret.data.allProductListingsDTO.length)
        let pList = []
        for (const element of ret.data.allProductListingsDTO) {
          let bag = {
            id:element.id,photo:element.photo,productName:element.productName,rating:element.rating,
            numberOfReviews:element.numberOfReviews, wholeSalePrice:element.wholeSalePrice,retailPrice:element.retailPrice,
            percentOff:element.percentOff,closedDate:element.closedDate,progressBarValue:element.progressBarValue  }
            pList.push(bag)
            console.log(pList.length)
        }
        console.log(element.id)
       // console.log(JSON.stringify(pList[0]))
    }

});


// node_modules/jest/bin/jest.js -t 'test productById'
it('test productById', async () => {

    // public api
    let client = await endPointClient(url)
    let ret = await client.query({
        query: PRODUCT_BY_ID,
        variables: { id: '564efc1f-1bfc-4b24-97c5-f35f4fd071ad'  }
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
        variables: { id: '564efc1f-1bfc-4b24-97c5-f35f4fd071ad'  }
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