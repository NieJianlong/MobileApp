import React from 'react';
import { View, Text, Image, StatusBar, SafeAreaView } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { Button, PasswordInput } from '../../Components';
import AppConfig from '../../Config/AppConfig';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import metrics from '../../Themes/Metrics';
import TextTip from '../../Components/EmptyReminder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../Navigation/NavigationService';

function CheckoutPaymentCompletedGuest(props) {
  const data = {
    textTip: 'Your order has been processed sucessfully',
    subTextTip:
      'Remember that you will receive your order once the required number of orders is reached',
    needButton: false,
    btnMsg: '',
    onPress: '',
  };
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={{ height: 25 }} />
          <Image
            style={{
              width: metrics.screenWidth,
              height: vs(150),
              resizeMode: 'contain',
            }}
            source={images.shopBagimage}
          />
        </SafeAreaView>
        <View style={{ height: vs(200) }}>
          <TextTip {...data} />
        </View>

        <Text
          style={[
            ApplicationStyles.screen.heading4Bold,
            {
              color: colors.black,
              fontSize: s(16),
              textAlign: 'center',
              marginTop: -60,
            },
          ]}
        >
          Do you wish to create an account to remember your details for future
          times?
        </Text>

        <View
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginTop: 25,
          }}
        >
          <PasswordInput placeholder={'Enter your password'} />
        </View>
        <View
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginTop: 35,
          }}
        >
          <Button
            text="REGISTER"
            onPress={() => {
              NavigationService.navigate('ExploreScreen');
            }}
          />
          <View style={{ marginTop: 30 }}>
            <Button
              backgroundColor="transparent"
              text="CLOSE WITHOUT AN ACCOUNT"
              textColor={colors.grey80}
              onPress={() => {
                NavigationService.navigate('ExploreScreen');
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default CheckoutPaymentCompletedGuest;
