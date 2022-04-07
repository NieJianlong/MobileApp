import React, { useRef, useState, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs, s } from "react-native-size-matters";
import { AppBar, BottomSheet, Button } from "../../Components";
import styles from "./stylequickguide";
import colors from "../../Themes/Colors";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import NumberFormat from "react-number-format";
import { StarRating, Progress } from "../../Components";
import AppConfig from "../../Config/AppConfig";
import { Images } from "../../Themes";

const SECTIONS = [
  {
    title: "What happens if all the slices sell quickly",
    content:
      "The order closes as soon as all slices are sold! If all the slices sell quickly, the items can be delivered or collected sooner.",
  },
  {
    title: "How can I help the slices sell quickly?",
    content:
      "By sharing the deal with your friends and family, they can buy their own slices which will help close the order sooner \n\nPlease note: this is not obligatory! SalamiSlicing allows you to buy slices together with other users of the site. This is just an option to share interesting slices with people you know.",
  },
  {
    title: "What happens if some slices are not sold?",
    content:
      "In this case, the seller has two options:\n 1.they can accept the offer & sell the slices sold \n 2.they can reject the offer & you will receive a full refund",
  },
  {
    title: "Can I change my delivery address?",
    content:
      "Of course! Your delivery address shows the local deals that you can buy from. You can change your address at anytime to update your location or add extra addresses, if you have multiple homes.",
  },
];

const QuickGuide = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.subContent}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections1) => {
    setActiveSections(activeSections1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.bodyContainer}>
          <View style={styles.tipContainer}>
            <View style={styles.content}>
              <Text style={[styles.balanceTipTxt, { fontSize: s(24) }]}>
                4 steps to the best deals
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 2,

                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={[styles.balanceTxt]}>
                {"Check the closing date"}
              </Text>
            </View>
          </View>
          <View style={{ backgroundColor: colors.white, borderRadius: 20 }}>
            <View
              style={[
                styles.row,
                { paddingHorizontal: AppConfig.paddingHorizontal },
              ]}
            >
              <Image
                source={{
                  uri: "https://salamislicing-product-images.s3.us-east-2.amazonaws.com/main image 1.jpg-01563d2f-0a99-4599-ae6d-63c53ecbc275.jpg",
                }}
                style={styles.productImage}
              />

              <View style={styles.v2}>
                <View>
                  <Text style={styles.heading4Bold}>{"ALcohol2012"}</Text>
                  <StarRating rating={4} ratingCount={3} />
                </View>
                <View style={styles.row}>
                  <View style={styles.v3}>
                    <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                    <NumberFormat
                      thousandSeparator={true}
                      prefix={"$"}
                      value={"20.5"}
                      displayType={"text"}
                      renderText={(text) => (
                        <Text style={styles.txtRetailPrice}>{"20.5"}</Text>
                      )}
                    />
                  </View>

                  <View style={styles.v3}>
                    <Text style={[styles.txtNoteBold, { color: colors.black }]}>
                      WHOLE SALE PRICE
                    </Text>
                    <NumberFormat
                      thousandSeparator={true}
                      prefix={"$"}
                      value={"$15"}
                      displayType={"text"}
                      renderText={(text) => (
                        <Text style={styles.txtWholesalePrice}>{"$15"}</Text>
                      )}
                    />
                  </View>

                  <View style={styles.percentOffContainer}>
                    <Text
                      style={[
                        styles.heading6Bold,
                        { color: colors.secondary00 },
                      ]}
                    >
                      {"26"}% OFF
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.v4}>
              <View
                style={{
                  padding: 10,
                  marginRight: 5,
                  borderRadius: 6,
                  borderColor: colors.red,
                  borderWidth: 2,
                }}
              >
                <Text style={styles.txtOrderClose}>Order closes on</Text>
                <Text style={styles.heading6Regular}>{"22/12/2020"}</Text>
              </View>
              <Progress
                maximumValue={50}
                currentValue={20}
                barWidth={s(60)}
                barHeight={vs(6)}
              />
              <View style={styles.row}>
                <Image source={Images.stock} style={styles.icStock} />
                <Text style={styles.txtOrderNumber}>27/100</Text>
                <TouchableOpacity>
                  <Image source={Images.info2} style={styles.icInfo} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                {/* <TouchableOpacity>
                  <Image source={Images.likeMed} style={styles.icShare} />
                </TouchableOpacity> */}
                <TouchableOpacity>
                  <Image source={Images.share} style={styles.icShare} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={{ color: colors.grey80, marginTop: 5 }}>
            Once the offer closes, the deal is over!
          </Text>
          <Text style={[styles.balanceTxt, { marginTop: 20 }]}>
            {"See how many slices are sold"}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 20,
            marginHorizontal: 20,
          }}
        >
          <View
            style={[
              styles.row,
              { paddingHorizontal: AppConfig.paddingHorizontal },
            ]}
          >
            <Image
              source={{
                uri: "https://salamislicing-product-images.s3.us-east-2.amazonaws.com/main image 1.jpg-01563d2f-0a99-4599-ae6d-63c53ecbc275.jpg",
              }}
              style={styles.productImage}
            />

            <View style={styles.v2}>
              <View>
                <Text style={styles.heading4Bold}>{"ALcohol2012"}</Text>
                <StarRating rating={4} ratingCount={3} />
              </View>
              <View style={styles.row}>
                <View style={styles.v3}>
                  <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"$"}
                    value={"20.5"}
                    displayType={"text"}
                    renderText={(text) => (
                      <Text style={styles.txtRetailPrice}>{"20.5"}</Text>
                    )}
                  />
                </View>

                <View style={styles.v3}>
                  <Text style={[styles.txtNoteBold, { color: colors.black }]}>
                    WHOLE SALE PRICE
                  </Text>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"$"}
                    value={"$15"}
                    displayType={"text"}
                    renderText={(text) => (
                      <Text style={styles.txtWholesalePrice}>{"$15"}</Text>
                    )}
                  />
                </View>

                <View style={styles.percentOffContainer}>
                  <Text
                    style={[styles.heading6Bold, { color: colors.secondary00 }]}
                  >
                    {"26"}% OFF
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.v4}>
            <View
              style={{
                padding: 10,
                marginRight: 5,
              }}
            >
              <Text style={styles.txtOrderClose}>Order closes on</Text>
              <Text style={styles.heading6Regular}>{"22/12/2020"}</Text>
            </View>
            <View
              style={{
                borderRadius: 6,
                borderColor: colors.red,
                borderWidth: 2,
                padding: 10,
                flexDirection: "row",
              }}
            >
              <Progress
                maximumValue={50}
                currentValue={20}
                barWidth={s(60)}
                barHeight={vs(6)}
              />

              <View style={styles.row}>
                <Image source={Images.stock} style={styles.icStock} />
                <Text style={styles.txtOrderNumber}>27/100</Text>
              </View>
              <TouchableOpacity>
                <Image source={Images.info2} style={styles.icInfo} />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              {/* <TouchableOpacity>
                  <Image source={Images.likeMed} style={styles.icShare} />
                </TouchableOpacity> */}
              <TouchableOpacity>
                <Image source={Images.share} style={styles.icShare} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: colors.grey80, marginTop: 5 }}>
            In the example above, 27 slices have sold.
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View>
              <Image source={Images.buyslice} style={styles.buyslice} />
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={[styles.balanceTxt]}>{"Buy Your slice(s)"}</Text>
              <Text style={styles.subText}>
                {"when you find the right offer, buy a slice and pay"}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View>
                <Image source={Images.buyslice} style={styles.buyslice} />
              </View>
              <View>
                <Text style={[styles.balanceTxt]}>
                  {"Receive confirmation"}
                </Text>
                <Text>
                  {
                    "when all slices are sold, the offer closes and the items can be delivered/collected."
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default QuickGuide;
