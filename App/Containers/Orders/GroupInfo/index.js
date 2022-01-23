import React from "react";
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../Components";
import ProductInfo from "../Components/ProductInfo";
import { Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useQuery } from "@apollo/client";
import { GET_LISTINGS } from "../../Explore/gql/explore_queries";
import ProductItem from "../../Explore/Components/ProductItem";

function GroupInfoScreen(props) {
  const { params } = useRoute();
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_LISTINGS, {
    variables: {
      searchOptions: {
        filter: "BY_LISTING_ID",
        filterParams: {
          listingId: params.item.listingId ?? "",
        },
      },
    },
    context: {
      headers: {
        isPrivate: false,
      },
    },
    onError: (res) => {},
  });
  if (data) {
    console.log("data====================================");
    console.log(data);
    console.log("====================================");
  }
  function renderAction(icon, text, action) {
    return (
      <TouchableOpacity onPress={action} style={styles.actionContainer}>
        <View style={styles.row}>
          <Image
            resizeMode={"contain"}
            source={icon}
            style={styles.actionIcon}
          />
          <Text style={styles.heading5Bold}>{text}</Text>
        </View>
        <Image source={Images.arrow_left} style={styles.icArrow} />
      </TouchableOpacity>
    );
  }
  function renderActions() {
    return (
      <View>
        {renderAction(Images.packageMed, "Order details", () =>
          NavigationService.navigate("OrderDetailScreen")
        )}
        {renderAction(Images.invoice, "Invoice", () =>
          NavigationService.navigate("InvoiceScreen")
        )}
        {renderAction(Images.star, "Write a review about the product", () =>
          NavigationService.navigate("RateOrderScreen", {
            onPost: () => {
              NavigationService.goBack();
            },
          })
        )}
        {renderAction(Images.user, "Evaluate the seller", () =>
          NavigationService.navigate("RateSellerScreen")
        )}
        {/* when order status is reached,user can track order */}
        {params &&
          params.type === "reached" &&
          renderAction(Images.orderTrackImage, "Track order", () =>
            NavigationService.navigate("TrackOrderScreen", { type: "track" })
          )}
        {/* when order status is received,user can return product */}
        {params &&
          params.type === "received" &&
          renderAction(Images.orderReturnImage, "Return product", () =>
            NavigationService.navigate("ReturnProductStep1Screen")
          )}
        {/* when order status is uncompleted,user can cancel the order */}
        {params &&
          params.type === "incompleted" &&
          renderAction(Images.orderCancelImage, "Cancel order", () =>
            NavigationService.navigate("CancelOrderScreen")
          )}
        {params &&
          params.type === "returnstatus" &&
          renderAction(Images.orderTrackImage, "Return status", () =>
            NavigationService.navigate("TrackOrderScreen", { type: "return" })
          )}
      </View>
    );
  }

  function renderBody() {
    if (data) {
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <ProductItem
            isAnnouncement={false}
            product={data.getListings[0]}
            size={"M"}
            notShowBottom={true}
          />
          {/* <ProductInfo product={data.getListings[0]} /> */}
          {renderActions()}
        </ScrollView>
      );
    }
    if (!data) {
      return null;
    }
    // return data ? (
    //   <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
    //     <ProductInfo product={data.GetListings[0]} />
    //     {renderActions()}
    //   </ScrollView>
    // ) : null;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <AppBar title={"Group Info"} />
        </View>
        {renderBody()}
      </SafeAreaView>
    </View>
  );
}

export default GroupInfoScreen;
