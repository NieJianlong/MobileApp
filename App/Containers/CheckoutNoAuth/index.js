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
import { ApplicationStyles } from '../../Themes';
import images from '../../Themes/Images';

function index(props) {
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
        <AppBar />
        <View
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            paddingTop: 100,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('LoginScreen');
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: AppConfig.paddingHorizontal,
                borderRadius: s(16),
                height: s(80),
                justifyContent: 'center',
              }}
            >
              <Text style={ApplicationStyles.screen.heading2Bold}>Sing In</Text>
            </View>
          </TouchableOpacity>
          <Image
            source={images.shopcartOrImage}
            style={{ height: 80, width: '100%', resizeMode: 'contain' }}
          />
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('CheckOutPersonalDetailsScreen');
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: AppConfig.paddingHorizontal,
                borderRadius: s(16),
                height: 160,
                justifyContent: 'center',
              }}
            >
              <Text style={ApplicationStyles.screen.heading2Bold}>
                Continue as guest
              </Text>
              <Text
                style={[
                  ApplicationStyles.screen.heading4Bold,
                  { color: colors.grey60 },
                ]}
              >
                You can continue as guest and only fill the mandatory details.
                You'll have the chance to create an account at the end of the
                process.
              </Text>
            </View>
          </TouchableOpacity>
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
