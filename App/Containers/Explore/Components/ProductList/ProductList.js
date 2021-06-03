import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import ProductItem from "../ProductItem";
import { HPageViewHoc } from "react-native-head-tab-view";
import ExploreSortBar from "../ExploreSortBar";
import { AlertContext } from "../../../Root/GlobalContext";
import ShareOptionList from "../ShareOptionList";
import { client } from "../../../../Apollo/apolloClient";
import * as gqlMappers from "../../gql/gql_mappers";
import * as aQM from "../../gql/explore_queries";
import colors from "../../../../Themes/Colors";
import { useQuery } from "@apollo/client";

const HFlatList = HPageViewHoc(FlatList);

/*explore productlist component */
export default function ProductList(props) {
  // if show it as row
  const { dispatch } = useContext(AlertContext);
  const [page, setPage] = useState(0);
  const [serverData, setServerData] = useState([]);
  const { isAnnouncement, index } = props;
  const [loadingMore, setLoadingMore] = useState(true);
  const [isRereshing, setIsRereshing] = useState(false);
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const toggleShareSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 580,
        children: () => (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <ShareOptionList />
          </View>
        ),
        sheetTitle: "Share to",
      },
    });
  }, [dispatch]);
  let params = {
    storeId: "0b950a80-7836-45b4-9ee3-42042097aafe",
    sortfield: "wholeSalePrice",
  };
  switch (props.listType) {
    case "All":
      params = {
        storeId: "0b950a80-7836-45b4-9ee3-42042097aafe",
        sortfield: "wholeSalePrice",
      };
      break;
    case "Announcements":
      params = {
        storeId: "0b950a80-7836-45b4-9ee3-42042097aafe",
        sortfield: "wholeSalePrice",
      };
      break;
    case "Electronics":
      params = {
        storeId: "0b950a80-7836-45b4-9ee3-42042097aafe",
        sortfield: "wholeSalePrice",
      };
      break;
    default:
      break;
  }
  const { loading, error, data, refetch, fetchMore } = useQuery(
    aQM.ACTIVE_PRODUCT_LISTINGS_BY_STORE_ID,
    {
      variables: {
        ...params,
        sortDirection: "ASCENDING",
        pageSize: 5,
      },
      context: {
        headers: {
          isPrivate: false,
        },
      },
      onError: (res) => {},
      onCompleted: (res) => {
        // console.log(JSON.stringify(res.activeProductListingsByStoreId));
        console.log(
          JSON.stringify(
            gqlMappers.mapProductListingDTO(res.activeProductListingsByStoreId)
          )
        );

        setServerData(
          gqlMappers.mapProductListingDTO(res.activeProductListingsByStoreId)
        );
      },
    }
  );
  //Pull up the load layout
  const LoadMoreView = useMemo(
    () => (
      <View style={{ alignItems: "center" }}>
        <ActivityIndicator
          style={{
            color: colors.primary,
            margin: 10,
          }}
          size={"large"}
          color={"red"}
          animating={true}
        />
        <Text>Loading more</Text>
      </View>
    ),
    []
  );
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
      data={serverData}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.01}
      //Set pull-up loading
      ListFooterComponent={loadingMore ? LoadMoreView : null}
      onStartRefresh={() => {
        setIsRereshing(true);
        refetch().then((res) => {
          setServerData(res.data.activeProductListingsByStoreId);
          setIsRereshing(false);
          setPage(0);
        });
      }}
      isRefreshing={isRereshing}
      onEndReached={() => {
        console.log("get more data");
        setPage(page + 1);
        setLoadingMore(true);
        fetchMore &&
          fetchMore({
            variables: {
              pageNo: page,
            },
          }).then((fetchMoreResult) => {
            // Update variables.limit for the original query to include
            // const { data, loading, networkStatus } = fetchMoreResult;
            console.log(fetchMoreResult.data);
            // setServerData(
            //   gqlMappers.mapProductListingDTO(res.activeProductListingsByStoreId)
            // );
            setServerData([
              ...serverData,
              ...gqlMappers.mapProductListingDTO(
                fetchMoreResult.data.activeProductListingsByStoreId
              ),
            ]);
            setLoadingMore(false);
          });
      }}
      renderItem={({ item, index }) => {
        return (
          <ProductItem
            onPressShare={toggleShareSheet}
            key={index.toString()}
            isAnnouncement={isAnnouncement}
            product={item}
            size={showProductAsRows ? "M" : "L"}
            {...props}
          />
        );
      }}
      {...props}
    />
  );
}
