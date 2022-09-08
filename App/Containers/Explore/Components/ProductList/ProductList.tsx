import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  useWindowDimensions,
} from "react-native";
import ProductItem from "../ProductItem";
import { HPageViewHoc } from "react-native-head-tab-view";
import ExploreSortBar from "../ExploreSortBar";
import Share from "react-native-share";
import colors from "../../../../Themes/Colors";
import { client } from "../../../../Apollo/apolloClient";
import {
  GetListingsDocument,
  GetShowcaseListingsDocument,
  SortDirection,
  SortType,
  useGetListingsLazyQuery,
} from "../../../../../generated/graphql";
import { shareOptions } from "../ShareOptionList";
import { t } from "react-native-tailwindcss";
import { isEmpty } from "lodash";
import { localCartVar } from "../../../../Apollo/cache";
import { useReactiveVar } from "@apollo/client";
const pageSize = 20;

const sortOptions = [
  {
    title: "Last added",
    sortDirection: SortDirection.Descending,
    sortType: SortType.Date,
  },
  {
    title: "Price: low to high",
    sortDirection: SortDirection.Ascending,
    sortType: SortType.Price,
  },
  {
    title: "Price: high to low",
    sortDirection: SortDirection.Descending,
    sortType: SortType.Price,
  },
];
const HFlatList = HPageViewHoc(FlatList);

/*explore productlist component */
export default function ProductList(props) {
  debugger;
  const Container = props.isNeedTabbar ? HFlatList : FlatList;
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [serverData, setServerData] = useState([]);
  const { isAnnouncement, index, filter, filterParams } = props;
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortItem, setSortItem] = useState(sortOptions[1]);
  const { width, height } = useWindowDimensions();
  const [isRereshing, setIsRereshing] = useState(false);
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const toggleShareSheet = useCallback(() => {
    Share.open(shareOptions);
  }, []);
  const searchOptions = useMemo(() => {
    return {
      filter: filter,
      filterParams: filterParams,
      sortBy: sortItem.sortType,
      sortDirection: sortItem.sortDirection,
      pageSize,
    };
  }, [filter, filterParams, sortItem]);

  const [queryListings, { loading, error, data, refetch, fetchMore }] =
    useGetListingsLazyQuery({
      context: {
        headers: {
          isPrivate: global.access_token ? true : false,
        },
      },
      onError: () => {
        setServerData([]);
      },
      onCompleted: async (res) => {
        setNoMore(false);
        if (res) {
          setServerData(res.getListings.content);
          if (isEmpty(res.getListings.content)) {
            if (
              searchOptions.filter === "ACTIVE_BY_ADDRESS_ID_AND_ANNOUNCEMENT"
            ) {
              searchOptions.filter = "SHOWCASE_BY_ANNOUNCEMENT";
            }
            if (searchOptions.filter === "ACTIVE_BY_ADDRESS_ID") {
              searchOptions.filter = "SHOWCASE";
            }
            if (searchOptions.filter === "ACTIVE_BY_ADDRESS_ID_AND_CATEGORY") {
              searchOptions.filter = "SHOWCASE_BY_CATEGORY";
            }
          }
        }
      },
    });
  useEffect(() => {
    queryListings({
      variables: {
        searchOptions: searchOptions,
      },
    });
    // }
  }, [searchOptions]);

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
    <View style={[t.flexGrow]}>
      <Container
        index={index}
        style={[{ height: height, width }]}
        contentContainerStyle={[t.pB32]}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={
          <ExploreSortBar
            onChange={(showAsRow) => {
              setShowProductAsRows(!showProductAsRows);
            }}
            option={sortItem}
            refresh={(item) => {
              setSortItem(item);
              setPage(0);

              setServerData([]);
              queryListings({
                variables: {
                  searchOptions: searchOptions,
                },
              });
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
            refetch()
              .then((res) => {
                setServerData(res.data.getListings.content);
                setIsRereshing(false);
                setNoMore(false);
                setPage(0);
              })
              .catch(() => {
                setServerData([]);
                setIsRereshing(false);
                setNoMore(false);
                setPage(0);
              });
        }}
        isRefreshing={isRereshing}
        onEndReached={async () => {
          if (noMore) {
            return;
          }
          if (page + 1 >= data?.getListings?.totalPages) {
            return;
          }
          setLoadingMore(true);
          const vars = {
            searchOptions: { ...searchOptions, pageNo: page + 1 },
          };
          const moreData = await client.query({
            query: GetListingsDocument,
            variables: vars,
            context: {
              headers: {
                isPrivate: false,
              },
            },
          });
          const datas = moreData.data.getListings;
          setServerData([...serverData, ...datas.content]);
          setLoadingMore(false);
          if (datas.length < pageSize) {
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
    </View>
  );
}
