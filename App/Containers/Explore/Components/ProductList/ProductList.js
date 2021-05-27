import React, { useState, useEffect, useCallback, useContext } from 'react';
import { FlatList, View } from 'react-native';
import * as jwt from '../../../../Apollo/jwt-request';
import ProductItem from '../ProductItem';
import { HPageViewHoc } from 'react-native-head-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header';
import ExploreSortBar from '../ExploreSortBar';
import { AlertContext } from '../../../Root/GlobalContext';
import ShareOptionList from '../ShareOptionList';
import { client } from '../../../../Apollo/apolloClient';
import * as gqlMappers from '../../gql/gql_mappers';
import * as aQM from '../../gql/explore_queries';

const HFlatList = HPageViewHoc(FlatList);
const announcements = [
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: '22/12/2020',
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: null,
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: '22/12/2020',
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: null,
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124, // numberOfReviews
    retailPrice: 2345,
    wholesalePrice: 1542,
    deliveryDate: null, // closeDate
    inStock: 100,
    orderCount: 24,
    minOrder: 10,
  },
];

/*explore productlist component */
export default function ProductList(props) {
  // if show it as row
  const { dispatch } = useContext(AlertContext);
  const [page, setPage] = useState(0);
  const { isAnnouncement, index } = props;

  const [showProductAsRows, setShowProductAsRows] = useState(true);
  let [products, setProducts] = useState([]);
  const toggleShareSheet = useCallback(() => {
    dispatch({
      type: 'changSheetState',
      payload: {
        showSheet: true,
        height: 580,
        children: () => (
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <ShareOptionList />
          </View>
        ),
        sheetTitle: 'Share to',
      },
    });
  }, [dispatch]);

  const getProductList = async (type) => {
    //just for testing
    if (type === 'All' || type === 'Announcements' || type === 'Electronics') {
      // issue exist on backend need hard coded storeId for now
      let ret = await client
        .query({
          query: aQM.ACTIVE_PRODUCT_LISTINGS_BY_STORE_ID,
          variables: {
            storeId: '0b950a80-7836-45b4-9ee3-42042097aafe',
            sortfield: 'wholeSalePrice',
            sortDirection: 'ASCENDING',
            pageNo: page,
            pageSize: 3,
          },
          context: {
            headers: {
              isPrivate: false,
            },
          },
        })
        .then((result) => result)
        .catch((err) => {
          console.log('getProductList query error' + err);
          return;
        });

      if (typeof ret !== 'undefined') {
        let pList = gqlMappers.mapProductListingDTO(
          ret.data.activeProductListingsByStoreId
        );
        setProducts(JSON.parse(pList));
      }
    }
    // await jwt
    //   .runMockGetProductList()
    //   .then(function (res) {
    //     //setProducts(res.productList)
    //     setProducts(JSON.parse(res.productList));
    //   })
    //   .catch(function (error) {});
  };
  useEffect(() => {
    console.log(JSON.stringify(props.listType));
    getProductList(props.listType);
    return () => {};
  }, [props]);
  return (
    <HFlatList
      index={index}
      keyboardShouldPersistTaps="always"
      ListHeaderComponent={
        <ExploreSortBar
          onChange={(showAsRow) => {
            setShowProductAsRows(!showProductAsRows);
          }}
        />
      }
      showsHorizontalScrollIndicator={false}
      // data={isAnnouncement ? announcements : products}
      data={products}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0}
      onEndReached={() => {
        console.log('get more data');
      }}
      renderItem={({ item, index }) => {
        return (
          <ProductItem
            onPressShare={toggleShareSheet}
            key={index.toString()}
            isAnnouncement={isAnnouncement}
            product={item}
            size={showProductAsRows ? 'M' : 'L'}
            {...props}
          />
        );
      }}
      {...props}
    />
  );
}
