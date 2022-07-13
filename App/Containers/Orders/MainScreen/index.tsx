import React, { Component, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { Button } from "../../../Components";
import NavigationService from "../../../Navigation/NavigationService";
import { Images } from "../../../Themes";
import styles from "./styles";
import { t } from "react-native-tailwindcss";
import {
  OrderItemHistoryEventType,
  useSearchBuyerOrdersQuery,
} from "../../../../generated/graphql";
import { useFocusEffect } from "@react-navigation/native";
import useLoading from "../../../hooks/useLoading";
import NoteBookTab from "../../../Components/NoteBookTab/NoteBookTab";
import OrderItem from "./OrderItem";
import { difference, groupBy } from "lodash";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: 0,
      showFilterSheet: false,
      isSearching: false,
      status: "unpaid",
    };
  }

  render() {
    const unpaidItems = this.props.orderItems.filter((item) => {
      return (
        item?.latestEventStatus ===
          OrderItemHistoryEventType.WaitingForPayment ||
        item?.latestEventStatus === OrderItemHistoryEventType.FailedPayment
      );
    });
    const results = groupBy(unpaidItems, "shippingAddressId");
    const paidItems = difference(this.props.orderItems, unpaidItems);
    debugger;
    const orderItems = this.state.status === "unpaid" ? unpaidItems : paidItems;
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={styles.safeArea}
          edges={["top", "right", "left", "bottom"]}
        >
          <View style={styles.header}>
            <View style={styles.icSearch} />
            <Image
              source={Images.logo3}
              style={styles.logo}
              resizeMode={"contain"}
            />
            <View style={styles.icSearch} />
          </View>
          <View style={styles.bodyContainer}>
            {orderItems.length > 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.v1}>
                  <Text style={[t.textLg, t.mY4]}>Orders</Text>
                  <NoteBookTab
                    onSelect={(item) => {
                      this.setState({
                        status: item,
                      });
                    }}
                  />
                </View>
                <View style={{ height: vs(15) }} />
                {orderItems.map((item, index) => (
                  <OrderItem item={item} />
                ))}
              </ScrollView>
            ) : (
              <View>
                <View style={styles.noOrderText}>
                  <Text style={styles.txt1}>
                    It looks like you haven't placed any order yet
                  </Text>
                  <Text style={styles.txt2}>
                    You can start exploring products right now!
                  </Text>
                </View>
                <View style={[t.pX6]}>
                  <Button
                    onPress={() => NavigationService.navigate("ExploreScreen")}
                    text={"EXPLORE PRODUCTS"}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

function OrderScreen() {
  const { data, refetch, loading } = useSearchBuyerOrdersQuery({
    variables: {
      options: {
        searchString: "",
        pageOption: {
          pageNumber: 0,
          pageSize: 1000,
        },
      },
    },

    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading({ show: loading });
  }, [loading, setLoading]);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  return loading ? (
    <View />
  ) : (
    <Order orderItems={data?.searchBuyerOrders?.content ?? []} />
  );
}

export default OrderScreen;
