import React, { useState, useCallback, useContext, useMemo } from "react";
import { FlatList, View, ActivityIndicator, Text } from "react-native";
import ProductItem from "../ProductItem";
import { HPageViewHoc } from "react-native-head-tab-view";
import ExploreSortBar from "../ExploreSortBar";
import { AlertContext } from "../../../Root/GlobalContext";
import ShareOptionList from "../ShareOptionList";
import * as aQM from "../../gql/explore_queries";
import colors from "../../../../Themes/Colors";
import { client } from "../../../../Apollo/apolloClient";
import {
  GetListingsDocument,
  useGetListingsLazyQuery,
  useGetListingsQuery,
} from "../../../../../generated/graphql";
const pageSize = 5;

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
  const [noMore, setNoMore] = useState(false);
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
    pageSize,
  };

  const { loading, error, data, refetch, fetchMore } = useGetListingsQuery({
    variables: {
      searchOptions: searchOptions,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onError: (res) => {},
    onCompleted: (res) => {
      // map data from server for now
      // add missing fields for product review
      // update for name changes in data from server
      setNoMore(false);
      setServerData(res.getListings.content);
    },
  });

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
        refetch &&
          refetch().then((res) => {
            setServerData(res.data.getListings.content);
            setIsRereshing(false);
            setNoMore(false);
            setPage(0);
          });
      }}
      isRefreshing={isRereshing}
      onEndReached={async () => {
        console.log("get more data" + noMore);
        if (noMore) {
          return;
        }
        if (page + 1 >= data?.getListings?.totalPages) {
          return;
        }
        setLoadingMore(true);
        const moreData = await client.query({
          query: GetListingsDocument,
          variables: {
            searchOptions: { ...searchOptions, pageNo: page + 1 },
          },
          context: {
            headers: {
              isPrivate: false,
            },
          },
        });
        setServerData([...serverData, ...moreData.data.getListings.content]);
        setLoadingMore(false);
        if (moreData.data.getListings.length < pageSize) {
          setNoMore(true);
        } else {
          setNoMore(false);
        }
        setPage(page + 1);
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
