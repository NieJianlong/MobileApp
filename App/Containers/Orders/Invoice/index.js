import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { AppBar } from "../../../Components";
import { vs } from "react-native-size-matters";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import { DeliveryOption } from "../../../../generated/graphql";
import { trimEnd } from "lodash";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderDeliverTo() {
    const order = this.props.data;
    const deliverAddress = this.props.data.deliveryAddress;
    const deliveryOption = this.props.data.deliveryOption;
    const pickupAddress = this.props.data.pickupAddress;
    // const sellerLocation = this.props.data.sellerLocation;
    let addressDetail = "";
    let title = "Delivered to";
    switch (deliveryOption) {
      case DeliveryOption.CourierDelivery:
        addressDetail = `${deliverAddress?.houseNumber ?? ""}${
          deliverAddress?.flat ?? ""
        }${deliverAddress?.villageArea ?? ""}${deliverAddress?.townCity}${
          deliverAddress?.provinceState
        }${deliverAddress?.country} ${deliverAddress?.pinCode}`;
        break;
      case DeliveryOption.CollectionPointPickup:
        title = "Pick up location";
        addressDetail = `${pickupAddress?.streetAddress1 ?? ""}${
          pickupAddress?.streetAddress2 ?? ""
        }${pickupAddress?.townCity ?? ""}${pickupAddress?.provinceState}${
          pickupAddress?.country
        } ${pickupAddress?.areaCode}`;
        break;
      case DeliveryOption.SellerDirectDelivery:
        addressDetail = `${deliverAddress?.houseNumber ?? ""}${
          deliverAddress?.flat ?? ""
        }${deliverAddress?.villageArea ?? ""}${deliverAddress?.townCity}${
          deliverAddress?.provinceState
        }${deliverAddress?.country} ${deliverAddress?.pinCode}`;
        break;
      case DeliveryOption.SellerLocationPickup:
        title = "Pick up location";
        addressDetail = `${pickupAddress?.streetAddress1 ?? ""}${
          pickupAddress?.streetAddress2 ?? ""
        }${pickupAddress?.townCity ?? ""}${pickupAddress?.provinceState}${
          pickupAddress?.country
        } ${pickupAddress?.areaCode}`;
        break;
      default:
        break;
    }
    return (
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.txtOrder}>{order.orderNumber}</Text>
          <View style={{ height: vs(10) }} />
          <Text style={styles.txtName}>User Name</Text>
          <Text style={styles.txtAddress}>{addressDetail}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.txtOrder}>TOTAL</Text>
          <View style={{ height: vs(10) }} />
          <Text style={styles.txtMoney}>₹{order.orderTotal}</Text>
          <Text style={styles.txtAddress}>
            {moment(order.orderDatetime).format("MMM DD,YYYY")}
          </Text>
        </View>
      </View>
    );
  }

  renderSellerInfo() {
    return (
      <View style={styles.sellerContainer}>
        <Text style={styles.heading4Bold}>Sold by</Text>
        <Text style={[styles.txtRegular, { marginVertical: vs(10) }]}>
          Seller Name, Streetname 00/Apt 404 - 00000 County, City - Country
        </Text>
      </View>
    );
  }

  renderPrice() {
    const order = this.props.data;
    const product = this.props.product;
    const picUrl = order.mainImagePath;
    const name = order.shortName;
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
      <View style={styles.priceContainer}>
        <Text style={[styles.heading4Bold, { marginBottom: vs(15) }]}>
          Your order
        </Text>
        <View style={styles.v2}>
          <View>
            <View style={styles.row}>
              <View style={styles.amountContainer}>
                <Text style={styles.heading4Bold}>1</Text>
              </View>
              <Text style={styles.heading4Regular}>{name}</Text>
            </View>
            <Text style={styles.productOptionText}>{optionString}</Text>
          </View>
          <Text style={styles.txt1}>₹{order.orderSubTotal}</Text>
        </View>
        <View style={styles.line} />
        <Text style={[styles.heading4Bold, { marginBottom: vs(15) }]}>
          Total
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
        {this.renderSellerInfo()}
        {this.renderPrice()}
      </ScrollView>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderBody()}</View>;
  }
}

function InvoiceScreen(props) {
  const { params } = useRoute();
  return <Invoice data={params?.data} product={params.product} />;
}

export default InvoiceScreen;
