import React from 'react';
import {
  View,
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
import { AppBar, Button } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import Content from './Content';
import { ApplicationStyles } from '../../Themes';

function ReturnProductStep3(props) {
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
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
                  NavigationService.navigate('GroupInfoScreen', {
                    type: 'returnstatus',
                  });
                  // NavigationService.goBack();
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
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Text
            style={{
              fontSize: s(24),
              fontFamily: fonts.primary,
              color: colors.black,
              fontWeight: '600',
            }}
          >
            Your return label
          </Text>
          <Content />
          <View
            style={{
              marginTop: vs(50),
              paddingHorizontal: AppConfig.paddingHorizontal,
            }}
          >
            <View
              style={{
                width: '100%',
                height: vs(24),
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'white',
                alignItems: 'center',
              }}
            >
              <Text
                style={[
                  ApplicationStyles.screen.txtRegular,
                  { color: colors.black },
                ]}
              >
                Products must be returned before
              </Text>
              <Text
                style={[
                  ApplicationStyles.screen.heading4Regular,
                  { color: colors.black, marginLeft: s(5), fontWeight: 'bold' },
                ]}
              >
                Dec 2, 2020
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button color={colors.primary} text="PRINT RETURN LABEL" />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ReturnProductStep3;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
