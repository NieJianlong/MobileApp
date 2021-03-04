import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput as RNTextInput,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar, TextInput } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import { AlertContext } from '../Root/index';
import { ApplicationStyles } from '../../Themes';

function index(props) {
  const { dispatch } = useContext(AlertContext);
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
          rightButton={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  NavigationService.goBack();
                  dispatch({
                    type: 'changAlertState',
                    payload: {
                      visible: true,
                      message:
                        "We'll study this and get back to you as soon as possible.",
                      color: colors.success,
                      title: 'Message sent!',
                    },
                  });
                }}
              >
                <Text style={[ApplicationStyles.screen.heading5Bold]}>
                  SUBMIT
                </Text>
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
            How may we help you?
          </Text>
        </View>
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <TextInput
            placeholder="Problem reason goes here"
            style={{ marginTop: vs(12) }}
          />
          <RNTextInput
            multiline={true}
            placeholder="Message"
            style={{
              marginTop: vs(16),
              height: vs(160),
              backgroundColor: colors.white,
              borderRadius: s(20),
              borderWidth: 1,
              borderColor: colors.grey20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: s(14),
              paddingVertical: s(20),
            }}
          />
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
