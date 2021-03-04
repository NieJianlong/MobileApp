import React, { useContext } from 'react';
import {
  View,
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
import { AppBar, TextInput, Button, RightButton } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import { AlertContext } from '../Root/GlobalContext';
import { ApplicationStyles, Images } from '../../Themes';
import TextTip from '../../Components/EmptyReminder';

const images = [Images.userLoveImage, Images.userMedImage, Images.userSadImage];

function Feedback(props) {
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
          rightButton={() => (
            <RightButton
              title="SUBMIT"
              onPress={() => {
                // NavigationService.goBack();
                // dispatch({
                //   type: 'changAlertState',
                //   payload: {
                //     visible: true,
                //     message:
                //       "We'll study this and get back to you as soon as possible.",
                //     color: colors.success,
                //     title: 'Message sent!',
                //   },
                // });

                dispatch({
                  type: 'changSheetState',
                  payload: {
                    showSheet: true,
                    height: 380,
                    children: () => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            style={{
                              marginTop: 20,
                              height: s(113),
                              width: s(113),
                              resizeMode: 'contain',
                            }}
                            source={Images.userFacebookImage}
                          />
                          <View
                            style={{
                              // marginLeft: -AppConfig.paddingHorizontal,
                              flex: 1,
                            }}
                          >
                            <TextTip
                              textTip="Thanks for sharing!"
                              subTextTip="Would you mind rating us in the App Store / Google Play?"
                              needButton
                              btnMsg="SURE!"
                              onPress={() => {
                                dispatch({
                                  type: 'changSheetState',
                                  payload: {
                                    showSheet: false,
                                  },
                                });
                              }}
                            ></TextTip>
                            <Button
                              backgroundColor="transparent"
                              textColor={colors.grey80}
                              onPress={() => {
                                NavigationService.navigate('');
                              }}
                              text={'NOT NOW'}
                            />
                          </View>
                        </View>
                      );
                    },
                  },
                });
              }}
            />
          )}
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
            Help us to improve
          </Text>
          <Text
            style={{
              fontSize: s(16),
              fontFamily: fonts.primary,
              color: colors.grey80,
              fontWeight: 'normal',
              marginVertical: vs(12),
            }}
          >
            How is your experience so far? What do you love or don't like that
            much? What would you like us to improve or to include in future
            releases?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: vs(12),
            }}
          >
            {images.map((item, index) => {
              return (
                <TouchableOpacity key={`dsdssd${index}`}>
                  <Image
                    style={{
                      width: s(80),
                      height: s(80),
                      resizeMode: 'contain',
                    }}
                    source={item}
                  ></Image>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <TextInput placeholder="Title" style={{ marginTop: vs(12) }} />
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

export default Feedback;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
