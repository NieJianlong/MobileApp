import React, { Component } from "react";
import { View, StatusBar, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../Components";
import { Images } from "../../../Themes";
import { vs } from "react-native-size-matters";

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderHeader() {
    return (
      <View style={styles.header}>
        <AppBar title={"Order 723644"} />
      </View>
    );
  }

  renderDeliverTo() {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Image source={Images.packageFilled} style={styles.icon} />
          <Text style={styles.heading5Bold}>Delivered to</Text>
        </View>

        <Text style={styles.txtRegular}>
          Username, Streetname 00{"\n"}
          County, City
        </Text>
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
    return (
      <View style={styles.productContainer}>
        <Text style={styles.heading4Bold}>Delivered Oct 30, 2020</Text>

        <View style={styles.v1}>
          <View style={styles.row}>
            <Image
              source={{
                uri:
                  "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
              }}
              style={styles.productIcon}
            />

            <View>
              <Text style={styles.productName}>
                The product name can be longer and occupy two lines
              </Text>

              <Text style={styles.productDetail}>
                Selected product options goes here
              </Text>
            </View>
          </View>

          <Text style={styles.txtPrice}>$1,599.99</Text>
        </View>
      </View>
    );
  }

  renderPrice() {
    return (
      <View style={styles.priceContainer}>
        <Text style={[styles.heading4Bold, { marginBottom: vs(15) }]}>
          Order summary
        </Text>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Subtotal</Text>
          <Text style={styles.heading4Regular}>$1.6999,98</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Service fee</Text>
          <Text style={styles.heading4Regular}>$8,98</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Delivery</Text>
          <Text style={styles.heading4Regular}>$9,98</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Regular}>Total savings</Text>
          <Text style={styles.heading4Regular}>$699,98</Text>
        </View>

        <View style={styles.v2}>
          <Text style={styles.heading4Bold}>Total</Text>
          <Text style={styles.heading4Bold}>$999,98</Text>
        </View>
      </View>
    );
  }

  renderBody() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {this.renderDeliverTo()}

        {this.renderBillingAddress()}

        {this.renderPayment()}

        {this.renderProductInfo()}

        {this.renderPrice()}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          {this.renderHeader()}

          {this.renderBody()}
        </SafeAreaView>
      </View>
    );
  }
}

export default OrderDetailScreen;
