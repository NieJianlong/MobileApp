import React, { useState, useCallback, useContext, useMemo } from "react";
import { FlatList, View, ActivityIndicator, Text } from "react-native";
import ProductItem from "../ProductItem";
import { HPageViewHoc } from "react-native-head-tab-view";
import ExploreSortBar from "../ExploreSortBar";
import { AlertContext } from "../../../Root/GlobalContext";
import ShareOptionList from "../ShareOptionList";
import * as gqlMappers from "../../gql/gql_mappers";
import * as aQM from "../../gql/explore_queries";
import colors from "../../../../Themes/Colors";
import { useQuery } from "@apollo/client";
import { client } from "../../../../Apollo/apolloClient";

const sortOptions = [
  { title: "Last added", sortDirection: "DESCENDING", sortType: "DATE" },
  {
    title: "Price: low to high",
    sortDirection: "ASCENDING",
    sortType: "PRICE",
  },
  {
    title: "Price: high to low",
    sortDirection: "DESCENDING",
    sortType: "PRICE",
  },
];
const HFlatList = HPageViewHoc(FlatList);

/*explore productlist component */
export default function ProductList(props) {
  // if show it as row
  const { dispatch } = useContext(AlertContext);
  const [page, setPage] = useState(0);
  const [serverData, setServerData] = useState([]);
  const { isAnnouncement, index, filter, filterParams } = props;
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortItem, setSortItem] = useState(sortOptions[1]);
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
  let searchOptions = {
    filter: filter,
    filterParams: filterParams,
    sortBy: sortItem.sortType,
    sortDirection: sortItem.sortDirection,
    pageSize: 5,
  };

  const { loading, error, data, refetch, fetchMore } = useQuery(
    aQM.GET_LISTINGS,
    {
      variables: {
        searchOptions: searchOptions,
      },
      context: {
        headers: {
          isPrivate: false,
        },
      },
      onError: (res) => {},
      onCompleted: (res) => {
        // map data from server for now
        // add missing fields for product review
        // update for name changes in data from server
        setServerData(gqlMappers.mapProductListingDTO(res.getListings));
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
          option={sortItem}
          refresh={(item) => {
            console.log("当前选中的item====================================");
            console.log(item);
            console.log("====================================");
            setSortItem(item);
            refetch();
          }}
        />
      }
      showsHorizontalScrollIndicator={false}
      // data={isAnnouncement ? announcements : products}
      data={serverData}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.1}
      //Set pull-up loading
      ListFooterComponent={loadingMore ? LoadMoreView : null}
      onStartRefresh={() => {
        setIsRereshing(true);
        refetch().then((res) => {
          setServerData(res.data.getListings);
          setIsRereshing(false);
          setPage(0);
        });
      }}
      isRefreshing={isRereshing}
      onEndReached={async () => {
        console.log("get more data");
        setPage(page + 1);
        setLoadingMore(true);
        const { data: fetchMoreResult } = await client.query(aQM.GET_LISTINGS, {
          variables: {
            searchOptions: { ...searchOptions, pageNo: page },
          },
          context: {
            headers: {
              isPrivate: false,
            },
          },
          onError: (res) => {},
        });
        setServerData([
          ...serverData,
          ...gqlMappers.mapProductListingDTO(fetchMoreResult.data.getListings),
        ]);
        setLoadingMore(false);
        // fetchMore &&
        //   fetchMore({
        //     variables: {
        //       pageNo: page,
        //     },
        //   }).then((fetchMoreResult) => {
        //     // Update variables.limit for the original query to include
        //     // const { data, loading, networkStatus } = fetchMoreResult;
        //     //console.log(fetchMoreResult.data);
        //     // setServerData(
        //     //   gqlMappers.mapProductListingDTO(res.activeProductListingsByStoreId)
        //     // );
        //   });
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
