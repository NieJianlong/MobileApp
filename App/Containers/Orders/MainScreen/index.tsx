import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import Animated from "react-native-reanimated";
import {
  Button,
  BottomSheet,
  BottomSheetBackground,
} from "../../../Components";
import CheckBox from "../Components/CheckBox";
import SearchBox from "../Components/SearchBox";
import NavigationService from "../../../Navigation/NavigationService";
import { Images } from "../../../Themes";
import styles from "./styles";
import { t } from "react-native-tailwindcss";
import moment from "moment";
import { useSearchBuyerOrdersQuery } from "../../../../generated/graphql";

class Order extends Component {
  fall = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {
      sortOption: 0,
      showFilterSheet: false,
      isSearching: false,
    };
  }

  toggleFilterSheet = () => {
    this.setState({ showFilterSheet: !this.state.showFilterSheet }, () => {
      if (this.state.showFilterSheet) {
        this.filterSheet.snapTo(0);
      } else {
        this.filterSheet.snapTo(1);
      }
    });
  };

  renderFilterSheet() {
    return (
      <BottomSheet
        customRef={(ref) => {
          this.filterSheet = ref;
        }}
        onCloseEnd={() => this.setState({ showFilterSheet: false })}
        callbackNode={this.fall}
        snapPoints={[vs(380), 0]}
        initialSnap={this.state.showFilterSheet ? 0 : 1}
        title={"Sort by"}
      >
        <View style={{ flex: 1 }}>
          {sortOptions.map((i, index) => {
            return (
              <View key={index.toString()}>
                <View style={{ height: vs(12) }} />
                <CheckBox
                  defaultValue={this.state.sortOption === index}
                  onSwitch={(t) => this.setState({ sortOption: index })}
                  label={i}
                />
              </View>
            );
          })}
        </View>
      </BottomSheet>
    );
  }

  renderHeader() {
    if (this.state.isSearching) {
      return (
        <View style={styles.header}>
          <SearchBox
            onPressBack={() => this.setState({ isSearching: false })}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.header}>
          <View style={styles.icSearch} />
          <Image
            source={Images.logo3}
            style={styles.logo}
            resizeMode={"contain"}
          />
          {this.props.orderItems.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({ isSearching: true });
              }}
            >
              <Image source={Images.search} style={styles.icSearch} />
            </TouchableOpacity>
          ) : (
            <View style={styles.icSearch} />
          )}
        </View>
      );
    }
  }

  renderNoOrder() {
    return (
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
            onPress={() => NavigationService.goBack()}
            text={"EXPLORE PRODUCTS"}
          />
        </View>
      </View>
    );
  }

  renderFilter() {
    return (
      <TouchableOpacity
        onPress={this.toggleFilterSheet}
        style={styles.filterContainer}
      >
        <Image source={Images.arrow_left} style={styles.icArrow} />
        <Text style={styles.txtFilter}>
          {sortOptions[this.state.sortOption]}
        </Text>
      </TouchableOpacity>
    );
  }

  renderOrderItem = (item, index) => {
    let detail = "";
    const statusText = item?.latestEventStatus?.replaceAll("_", " ");
    detail =
      statusText?.substring(0, 1) +
      statusText?.substring(1, statusText.length).toLowerCase() +
      " at " +
      moment(item.orderDatetime).format("DD/MM/YYYY");
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate("GroupInfoScreen", {
            type: item.type,
            item: item,
          });
        }}
        disabled={item.isCompleted}
        key={index.toString()}
        style={[styles.itemContainer, item.isCompleted && { opacity: 0.5 }]}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: item.mainImagePath }}
            resizeMode="contain"
            style={styles.itemAvatar}
          />
          <View style={styles.v2}>
            <View style={styles.row}>
              <Text style={styles.heading5Bold}>{item.shortName}</Text>

              {/* {item.isAnnoucement && (
                <View style={styles.annoucementContainer}>
                  <Text style={styles.annoucementText}>Announcement</Text>
                </View>
              )} */}
            </View>
            <Text style={styles.txt3}>
              {detail}
              {/* {item.lastMessage.author}:{" "}
              <Text style={{ color: Colors.grey60 }}>
                {item.lastMessage.content}
              </Text> */}
            </Text>
          </View>
        </View>

        <View style={styles.v3}>
          {item.isCompleted ? (
            <Text style={styles.heading6Regular}>COMPLETED</Text>
          ) : (
            <Text style={styles.heading6Regular}>
              {/* {moment(item.lastMessage.time).fromNow()} */}
            </Text>
          )}
          {/* {item.unreadCount > 0 && (
            <View style={styles.unreadContainer}>
              <Text style={styles.unreadNumber}>{item.unreadCount}</Text>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    );
  };

  renderBody() {
    if (this.state.isSearching) {
    } else {
      return (
        <View style={styles.bodyContainer}>
          {this.props.orderItems.length > 0 ? (
            <ScrollView sshowsVerticalScrollIndicator={false}>
              <View style={styles.v1}>
                <Text style={styles.heading1Bold}>Orders</Text>
                {this.renderFilter()}
              </View>
              <View style={{ height: vs(15) }} />
              {this.props.orderItems.map((item, index) =>
                this.renderOrderItem(item, index)
              )}
            </ScrollView>
          ) : (
            this.renderNoOrder()
          )}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={styles.safeArea}
          edges={["top", "right", "left", "bottom"]}
        >
          {this.renderHeader()}
          {this.renderBody()}
        </SafeAreaView>
        {/* background for bottom sheet */}
        <BottomSheetBackground
          visible={
            this.state.showFilterSheet ||
            this.state.showColorSheet ||
            this.state.showAddToCartSheet
          }
          controller={this.fall}
        />
        {this.renderFilterSheet()}
      </View>
    );
  }
}

function OrderScreen() {
  const { data } = useSearchBuyerOrdersQuery({
    variables: {
      options: {
        searchString: "",
        pageOption: {
          pageNumber: 0,
          pageSize: 10,
        },
      },
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });

  return <Order orderItems={data?.searchBuyerOrders?.content ?? []} />;
}

export default OrderScreen;

const sortOptions = ["Not 100% slices product", "Completed"];
