import { endPointClient } from '../App/Apollo/public-api-v3'
import {
    ALL_PRODUCT_LISTINGS_DTO
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
        console.log(JSON.stringify(ret))
        console.log(ret.data.allProductListingsDTO.length)
    }

});