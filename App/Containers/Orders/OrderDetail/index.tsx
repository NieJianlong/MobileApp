import React, { Component } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles";
import { Images } from "../../../Themes";
import { vs } from "react-native-size-matters";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DeliveryOption } from "../../../../generated/graphql";
import { t } from "react-native-tailwindcss";
import { trimEnd } from "lodash";
import moment from "moment";
import { mapGQLAddressToDelivery } from "../../Explore/gql/gql_mappers";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderDeliverTo() {
    const deliverAddress = this.props.data?.deliveryAddress;
    const deliveryOption = this.props.data?.deliveryOption;
    const pickupAddress = this.props.data?.pickupAddress;
    // const sellerLocation = this.props.data.sellerLocation;
    let addressDetail = "";
    let title = "Delivered to";
    switch (deliveryOption) {
      case DeliveryOption.CourierDelivery:
        addressDetail = mapGQLAddressToDelivery(deliverAddress, true);

        break;
      case DeliveryOption.CollectionPointPickup:
        title = "Pick up location";
        addressDetail = mapGQLAddressToDelivery(pickupAddress, true);

        break;
      case DeliveryOption.SellerDirectDelivery:
        addressDetail = mapGQLAddressToDelivery(deliverAddress, true);
        break;
      case DeliveryOption.SellerLocationPickup:
        title = "Pick up location";
        addressDetail = mapGQLAddressToDelivery(pickupAddress, true);
        break;
      default:
        break;
    }
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Image source={Images.packageFilled} style={styles.icon} />
          <Text style={styles.heading5Bold}>{title}</Text>
        </View>
        <Text style={styles.txtRegular}>{addressDetail}</Text>
      </View>
    );
  }

  renderBillingAddress() {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Image source={Images.packageFilled} style={styles.icon} />
          <Text style={styles.heading5Bold}>Billing Address</Text>
        </View>
        <Text style={styles.txtRegular}>
          Username, Streetname 00{"\n"}
          County, City
        </Text>
      </View>
    );
  }

  renderPayment() {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Image source={Images.packageFilled} style={styles.icon} />
          <Text style={styles.heading5Bold}>Payment</Text>
        </View>

        <Text style={styles.txtRegular}>MasterCard **** **** **** 5464</Text>
      </View>
    );
  }

  renderProductInfo() {
    const order = this.props.data;
    const picUrl = order.mainImagePath;
    const name = order.shortName;
    const product = this.props.product;
    console.log("product====================================");
    console.log(product);
    console.log("====================================");
    const variant = product?.listingVariants?.find(
      (item) => item.variantId === order.variantId
    );
    let optionString = "";
    variant?.options?.forEach((option) => {
      optionString = optionString + option.key + ": " + option.value + ", ";
    });
    trimEnd(optionString, ", ");

    const price = order.itemPrice;
    return (
      <View style={styles.productContainer}>
        <Text style={styles.heading4Bold}>
          Order placed on {moment(order.orderDatetime).format("MMM DD,YYYY")}
        </Text>

        <View style={styles.v1}>
          <View style={styles.row}>
            <Image
              source={{
                uri: picUrl,
              }}
              resizeMode="contain"
              style={styles.productIcon}
            />

            <View style={[t.mL2]}>
              <Text style={[styles.productName]}>{name}</Text>
              <Text style={styles.productDetail}>{optionString}</Text>
            </View>
          </View>

          <Text style={styles.txtPrice}>₹{price}</Text>
        </View>
      </View>
    );
  }

  renderPrice() {
    const order = this.props.data;
    const product = this.props.product;
    return (
      <View style={styles.priceContainer}>
        <Text style={[styles.heading4Bold, { marginBottom: vs(15) }]}>
          Order summary
        </Text>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Subtotal</Text>
          <Text style={styles.heading4Regular}>₹{order.orderSubTotal}</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Service fee</Text>
          <Text style={styles.heading4Regular}>₹{order.orderServiceFees}</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Delivery</Text>
          <Text style={styles.heading4Regular}>
            ₹{product.courierShippingFee ?? 0}
          </Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Total savings</Text>
          <Text style={styles.heading4Regular}>₹{order.totalSavings}</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Bold}>Total</Text>
          <Text style={styles.heading4Bold}>₹{order.orderTotal}</Text>
        </View>
      </View>
    );
  }

  renderBody() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {this.renderDeliverTo()}

        {/* {this.renderBillingAddress()}

        {this.renderPayment()} */}

        {this.renderProductInfo()}

        {this.renderPrice()}
      </ScrollView>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderBody()}</View>;
  }
}

function OrderDetailScreen(props) {
  const { params } = useRoute();
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.data.orderItemNumber,
    });
  }, [navigation]);
  return <OrderDetail data={params?.data} product={params.product} />;
}

export default OrderDetailScreen;
