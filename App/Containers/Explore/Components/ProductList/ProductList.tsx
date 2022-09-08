import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
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
import { AlertContext } from "../../../Root/GlobalContext";
import Share from "react-native-share";

import colors from "../../../../Themes/Colors";
import { client } from "../../../../Apollo/apolloClient";
import {
  GetListingsDocument,
  GetShowcaseListingsDocument,
  SortDirection,
  SortType,
  useGetListingsLazyQuery,
  useGetShowcaseListingsLazyQuery,
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
  const Container = props.isNeedTabbar ? HFlatList : FlatList;
  const localCart = useReactiveVar(localCartVar);
  // if show it as row
  const { dispatch } = useContext(AlertContext);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [serverData, setServerData] = useState([]);
  const { isAnnouncement, index, filter, filterParams } = props;
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortItem, setSortItem] = useState(sortOptions[1]);
  const { width, height } = useWindowDimensions();
  const [isRereshing, setIsRereshing] = useState(false);
  const [showProductAsRows, setShowProductAsRows] = useState(true);

  const [shouldUseshowCase, setShouldUseshowCase] = useState(false);
  const toggleShareSheet = useCallback(() => {
    Share.open(shareOptions);
    // dispatch({
    //   type: "changSheetState",
    //   payload: {
    //     showSheet: true,
    //     height: 250,
    //     children: () => (
    //       <View style={{ flex: 1, justifyContent: "flex-end" }}>
    //         <ShareOptionList />
    //       </View>
    //     ),
    //     sheetTitle: "Share to",
    //   },
    // });
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
  const pageOptions = useMemo(() => {
    return {
      sortBy: sortItem.sortType,
      sortDirection: sortItem.sortDirection,
      pageSize,
    };
  }, [sortItem]);
  const [
    getshowCases,
    {
      loading: loading1,
      error: error1,
      data: data1,
      refetch: refetch1,
      fetchMore1,
    },
  ] = useGetShowcaseListingsLazyQuery({
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
      if (res && shouldUseshowCase) {
        setServerData(res.getShowcaseListings.content);
      }
    },
  });

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
            setShouldUseshowCase(true);
          } else {
            setShouldUseshowCase(false);
          }
        }
      },
    });
  useEffect(() => {
    if (shouldUseshowCase) {
      if (searchOptions.filter === "ACTIVE_BY_ADDRESS_ID_AND_ANNOUNCEMENT") {
        searchOptions.filter = "SHOWCASE_BY_ANNOUNCEMENT";
      }
      if (searchOptions.filter === "ACTIVE_BY_ADDRESS_ID") {
        searchOptions.filter = "SHOWCASE";
      }
      if (searchOptions.filter === "ACTIVE_BY_ADDRESS_ID_AND_CATEGORY") {
        searchOptions.filter = "SHOWCASE_BY_CATEGORY";
      }
      getshowCases({ variables: { options: searchOptions } });
    } else {
      queryListings({
        variables: {
          searchOptions: searchOptions,
        },
      });
    }
  }, [searchOptions, shouldUseshowCase]);
  useEffect(() => {
    setShouldUseshowCase(false);
  }, [localCart.deliverAddress]);

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
              if (shouldUseshowCase) {
                setServerData([]);
                queryListings({
                  variables: {
                    searchOptions: searchOptions,
                  },
                });
              }
              setShouldUseshowCase(false);
              // const newFilter = {
              //   filter: filter,
              //   filterParams: filterParams,
              //   sortBy: item.sortType,
              //   sortDirection: item.sortDirection,
              //   pageSize,
              // };
              // console.log("newFilter====================================");
              // console.log(newFilter);
              // console.log("====================================");
              // refetch({
              //   variables: {
              //     searchOptions: newFilter,
              //   },
              // });
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
          if (shouldUseshowCase) {
            refetch1 &&
              refetch1().then((res) => {
                setServerData(res.data.getShowcaseListings.content);
                setIsRereshing(false);
                setNoMore(false);
                setPage(0);
              });
          } else {
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
          }
        }}
        isRefreshing={isRereshing}
        onEndReached={async () => {
          if (noMore && !shouldUseshowCase) {
            return;
          }
          if (
            page + 1 >=
            (shouldUseshowCase
              ? data1.getShowcaseListings.totalPages
              : data?.getListings?.totalPages)
          ) {
            return;
          }
          setLoadingMore(true);
          const vars = shouldUseshowCase
            ? { options: { ...pageOptions, pageNo: page + 1 } }
            : {
                searchOptions: { ...searchOptions, pageNo: page + 1 },
              };
          const moreData = await client.query({
            query: shouldUseshowCase
              ? GetShowcaseListingsDocument
              : GetListingsDocument,
            variables: vars,
            context: {
              headers: {
                isPrivate: false,
              },
            },
          });
          const datas = shouldUseshowCase
            ? moreData.data.getShowcaseListings
            : moreData.data.getListings;
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
