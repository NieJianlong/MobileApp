import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s, vs } from "react-native-size-matters";

import styles from "./styles";

import { Colors, Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import Share from "react-native-share";
import { shareOptions } from "../../Explore/Components/ShareOptionList";

function OrderPlaced(props) {
  console.log("props?.route?.params?.items =====", props?.route?.params?.items);
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.icSearch} />

        <Image
          source={Images.logo3}
          style={styles.logo}
          resizeMode={"contain"}
        />

        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("PackageScreen");
          }}
        >
          <Image source={Images.crossMedium} style={styles.icSearch} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.textArea}>
          <Text style={styles.txt1}>
            Your order has been{"\n"}processed sucessfully
          </Text>

          <Text style={styles.txt2}>
            Remember that you will not receive your order until the number of
            people required to make the purchase has been reached.
          </Text>
        </View>

        <Text style={styles.txt3}>Inform your group</Text>

        <View style={styles.informContainer}>
          {props?.route?.params?.from !== "checkout" ? (
            <View style={styles.row}>
              <Image
                style={styles.productImage}
                source={{
                  uri: props?.route?.params?.items?.photo,
                }}
              />

              <View>
                <Text style={styles.heading5Bold}>
                  {props?.route?.params?.items?.longName}
                </Text>
                <Text style={styles.heading6Regular}>User name</Text>
              </View>
            </View>
          ) : (
            props?.route?.params?.items?.map((item, index) => {
              return (
                <View style={styles.row}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: item?.photo,
                    }}
                  />

                  <View>
                    <Text style={styles.heading5Bold}>{item?.longName}</Text>
                    <Text style={styles.heading6Regular}>User name</Text>
                  </View>
                </View>
              );
            })
          )}
          {renderChatOptions()}
        </View>

        {/*<Text style={styles.txt3}>Who bought this item also bought...</Text>*/}

        {/*{renderProducList()}*/}
      </ScrollView>
    );
  };

  const renderChatOptions = () => {
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatIconsContainer}>
          {/*<TouchableOpacity*/}
          {/*  style={[styles.chatButton, { backgroundColor: Colors.facebook }]}*/}
          {/*>*/}
          {/*  <Image source={Images.facebook} style={styles.chatIcon} />*/}
          {/*</TouchableOpacity>*/}

          <TouchableOpacity
            onPress={() => {
              Share.open(shareOptions);
            }}
            style={[
              styles.chatButton,
              { backgroundColor: Colors.whatsapp, paddingLeft: 0 },
            ]}
          >
            <Image source={Images.whatsapp} style={styles.chatIcon} />
          </TouchableOpacity>

          {/*<TouchableOpacity*/}
          {/*  style={[styles.chatButton, { backgroundColor: Colors.google }]}*/}
          {/*>*/}
          {/*  <Image source={Images.google} style={styles.chatIcon} />*/}
          {/*</TouchableOpacity>*/}

          {/*<TouchableOpacity*/}
          {/*  style={[styles.chatButton, { backgroundColor: Colors.twitter }]}*/}
          {/*>*/}
          {/*  <Image source={Images.twitter} style={styles.chatIcon} />*/}
          {/*</TouchableOpacity>*/}

          {/*<TouchableOpacity*/}
          {/*  style={[styles.chatButton, { backgroundColor: Colors.grey10 }]}*/}
          {/*>*/}
          {/*  <Image source={Images.add1} style={styles.icAdd} />*/}
          {/*</TouchableOpacity>*/}
        </View>

        {/*<Text*/}
        {/*  style={[styles.txtBold, { marginTop: vs(20), marginBottom: vs(15) }]}*/}
        {/*>*/}
        {/*  You can chat here with seller and co-buyers:*/}
        {/*</Text>*/}

        {/*<View style={{ width: "100%" }}>*/}
        {/*  <Button backgroundColor={Colors.grey80} text={"CHAT"} />*/}
        {/*</View>*/}
      </View>
    );
  };

  // const renderProduct = (item, index) => {
  //   return <ProductItem key={index.toString()} product={item} size={"M"} />;
  // };

  // const renderProducList = () => {
  //   return (
  //     <View style={styles.prodListContainer}>
  //       {products.map((item, index) => renderProduct(item, index))}
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {renderHeader()}

        {renderBody()}
      </SafeAreaView>
    </View>
  );
}

export default OrderPlaced;
