import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

import AppConfig from "../Config/AppConfig";
import { Images, Fonts, Colors, ApplicationStyles } from "../Themes";

//alert component
class AlertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.fadeIn();
  }

  //fade in animation
  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      this.props.onDismiss && this.props.onDismiss();
      this.fadeOut();
    }, 5000);
  };

  //fade out animation
  fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    this.props.onDismiss && this.props.onDismiss();
  };

  render() {
    const { message, title, color, visible, onDismiss, action } = this.props;

    if (visible) {
      return (
        <Animated.View
          useNativeDriver={true}
          style={[styles.container, { opacity: this.state.fadeAnim }]}
        >
          <SafeAreaView
            edges={["top", "left", "right"]}
            style={styles.safeAreaView}
          >
            <View style={[styles.line, { backgroundColor: color }]} />
            {title ? (
              <View style={styles.contentContainer}>
                <View style={styles.row}>
                  <Text style={[styles.txtTitle, { color: color }]}>
                    {title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      onDismiss && onDismiss();
                      this.fadeOut();
                    }}
                  >
                    <Image style={styles.icClose} source={Images.crossMedium} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.txtMsg}>{message}</Text>

                {action && (
                  <View style={styles.actionContainer}>{action()}</View>
                )}
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <View style={styles.row}>
                  <Text style={styles.txtTitle}>{message}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      onDismiss && onDismiss();
                      this.fadeOut();
                    }}
                  >
                    <Image style={styles.icClose} source={Images.crossMedium} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </SafeAreaView>
        </Animated.View>
      );
    } else return null;
  }
}

function Alert(props) {
  return <AlertComponent {...props} />;
}

export default Alert;

const styles = ScaledSheet.create({
  container: {
    minHeight: "70@vs",
    backgroundColor: Colors.white,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: "24@s",
    borderBottomRightRadius: "24@s",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  safeAreaView: {
    flex: 1,
  },
  line: {
    backgroundColor: Colors.success,
    height: "4@vs",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingVertical: "10@vs",
  },
  txtTitle: {
    ...ApplicationStyles.screen.heading4Bold,
  },
  txtMsg: {
    ...ApplicationStyles.screen.heading4Regular,
  },
  icClose: {
    width: "20@s",
    height: "20@s",
    tintColor: Colors.grey60,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionContainer: {
    marginTop: "10@vs",
    marginBottom: "5@vs",
  },
});
