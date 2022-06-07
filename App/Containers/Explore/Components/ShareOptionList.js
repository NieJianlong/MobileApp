import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Fonts, Colors, Images, ApplicationStyles } from "../../../Themes";
import { Button } from "../../../Components";
import Share from "react-native-share";

const url = "https://www.google.com/";
const title = "Awesome Contents";
const message = "Please check this out.";
const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";

export const shareOptionsDetails = (productLink, product) => {
  console.log("see the product details", product);
  const shareOptions = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: { type: "url", content: url },
          item: {
            default: { type: "url", content: url },
          },
          subject: {
            default: title,
          },
          linkMetadata: { originalUrl: url, url, title },
        },
        {
          // For sharing text.
          placeholderItem: { type: "text", content: message },
          item: {
            default: { type: "text", content: message },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: message,
          },
        },
        {
          // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: "url",
            content: icon,
          },
          item: {
            default: {
              type: "text",
              content: `${message} ${url}`,
            },
          },
          linkMetadata: {
            title: message,
            icon: icon,
          },
        },
      ],
    },
    default: {
      title: "Title",
      message: `${product.longName}${"\n\n"}Retail Price: ${product.retailPrice} ${'\n'}Whole Sale Price: ${product.wholeSalePrice}${"\n\n"}Please check this deal of the day! ${"\n"} ${product.photo}`,
      url: "data:image/png;base64," + productLink,
      subject: "Subject",
    },
  });

  Share.open(shareOptions);
};

class ShareOptionList extends Component {
  render() {
    return (
      <View>
        {/* <TouchableOpacity style={styles.optionContainer}>
          <View
            style={[styles.chatButton, { backgroundColor: Colors.facebook }]}
          >
            <Image source={Images.facebook} style={styles.chatIcon} />
          </View>

          <Text style={styles.text}>Facebook</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            Share.open(shareOptions);
            // Share.shareSingle(shareOptions)
            //   .then((res) => {
            //     console.log(res);
            //   })
            //   .catch((err) => {
            //     err && console.log(err);
            //   });
          }}
        >
          <View
            style={[styles.chatButton, { backgroundColor: Colors.whatsapp }]}
          >
            <Image source={Images.whatsapp} style={styles.chatIcon} />
          </View>

          <Text style={styles.text}>Whatsapp</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.optionContainer}>
          <View style={[styles.chatButton, { backgroundColor: Colors.google }]}>
            <Image source={Images.google} style={styles.chatIcon} />
          </View>

          <Text style={styles.text}>Google</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.optionContainer}>
          <View
            style={[styles.chatButton, { backgroundColor: Colors.twitter }]}
          >
            <Image source={Images.twitter} style={styles.chatIcon} />
          </View>

          <Text style={styles.text}>Twitter</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.optionContainer}>
          <View style={[styles.chatButton, { backgroundColor: Colors.grey80 }]}>
            <Image source={Images.link} style={styles.chatIcon} />
          </View>

          <Text style={styles.text}>Link</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={[
            styles.optionContainer,
            { borderBottomColor: Colors.background },
          ]}
        >
          <View style={[styles.chatButton, { backgroundColor: Colors.grey80 }]}>
            <Image source={Images.qr} style={styles.chatIcon} />
          </View>

          <Text style={styles.text}>QR Code</Text>
        </TouchableOpacity> */}

        <View style={styles.v1}>
          <View style={styles.line} />
          <Text style={styles.txtOr}>OR</Text>
          <View style={styles.line} />
        </View>

        <Button backgroundColor={Colors.grey80} text={"MORE OPTIONS"} />
      </View>
    );
  }
}

ShareOptionList.propTypes = {};

ShareOptionList.defaultProps = {};

const styles = ScaledSheet.create({
  container: {
    height: "48@vs",
    backgroundColor: "#7FFFD4",
    borderRadius: "20@s",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  chatIcon: {
    width: "16@s",
    height: "16@s",
    tintColor: Colors.white,
  },
  chatButton: {
    width: "38@s",
    height: "38@s",
    borderRadius: "20@s",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "15@s",
  },
  chatIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "280@s",
  },
  optionContainer: {
    paddingVertical: "12@vs",
    borderBottomColor: Colors.grey10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    ...ApplicationStyles.screen.heading4Regular,
  },
  txtOr: {
    ...ApplicationStyles.screen.heading6Regular,
    color: Colors.grey60,
  },
  v1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20@vs",
  },
  line: {
    width: "120@s",
    height: 1,
    backgroundColor: Colors.grey20,
  },
});
export default ShareOptionList;
