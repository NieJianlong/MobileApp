import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import TextTip from '../UserInfo/TextTip';
import images from '../../Themes/Images';

function index(props) {
  const data = {
    textTip: 'Your order has been canceled',
    subTextTip: 'You will receive the refund money in \n 3-5 business days',
    needButton: true,
    btnMsg: 'CONTINUE EXPLORING',
    onPress: '',
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar
          hiddenBackBtn
          rightButton={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  NavigationService.goBack();
                }}
              >
                <Image
                  style={{
                    width: s(25),
                    height: s(25),
                    tintColor: colors.grey60,
                  }}
                  source={images.crossMedium}
                />
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <Image
            style={{
              width: '100%',
              height: 80,
              marginTop: 50,
              resizeMode: 'contain',
            }}
            source={images.orderCanceledImage}
          />
          <View style={{ height: s(230), backgroundColor: 'transparent' }}>
            <TextTip {...data} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
