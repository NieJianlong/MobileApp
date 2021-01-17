/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 15:54:53
 * @LastEditTime: 2021-01-09 14:57:59
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Screen
 * @FilePath: /MobileApp/App/Containers/UserInfo/index.js
 */
import React, { useReducer, useEffect, useRef } from 'react';
import { View, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import { AppBar, Alert, BottomSheet, Button } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';
import HorizontalMenu from './HorizontalMenu';
import images from '../../Themes/Images';
import TextTip from './TextTip';

export const AlertContext = React.createContext({});
const initialState = {
  visible: false,
  message: '',
  title: '',
  color: colors.success,
  onDismiss: () => {},
  action: () => {},
  showSheet: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'changAlertState':
      return { ...state, ...action.payload };
    case 'showPaymentRemoveSheet':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

function index(props) {
  const [
    { visible, message, color, onDismiss, title, showSheet },
    dispatch,
  ] = useReducer(reducer, initialState);
  fall = new Animated.Value(0);
  useEffect(() => {
    dispatch({
      type: 'changAlertState',
      payload: {
        action: () => {
          dispatch({ type: 'changAlertState', payload: { visible: false } });
        },
      },
    });
  }, []);
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch({ type: 'changAlertState', payload: { visible: false } });
      }, 2100);
    }
  }, [visible]);
  return (
    <AlertContext.Provider value={{ dispatch }}>
      {/* {showSheet && renderSheet()} */}
      <View style={styles.container}>
        <SafeAreaView style={{ maxHeight: 64 }}>
          <AppBar></AppBar>
        </SafeAreaView>
        <View>
          <UserHeader needEdit></UserHeader>
        </View>
        <Alert
          visible={visible}
          message={message}
          title={title}
          color={color}
          onDismiss={onDismiss}
        />
        <HorizontalMenu></HorizontalMenu>
      </View>

      {/* {showSheet && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              backgroundColor: 'rgb(29,29,29)',
              opacity: Animated.add(0.85, Animated.multiply(-1.0, fall)),
            }}
          />
        </TouchableWithoutFeedback>
      )} */}
    </AlertContext.Provider>
  );
}
function renderSheet() {
  const sheetEl = useRef(null);
  const tips = {
    textTip: 'Remove Payment Method',
    subTextTip: 'This action cannot be undone,\n are you sure?',
    needButton: true,
    btnMsg: 'SURE!',
    onPress: () => {},
    callback: () => {},
  };
  return (
    <BottomSheet
      customRef={sheetEl}
      onCloseEnd={() => {}}
      // callbackNode={new Animated.Value(0)}
      snapPoints={[vs(380), 0]}
      initialSnap={0}
      // title={'Add your delivery address'}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={styles.credit}
          source={images.userCreditCardImage}
        ></Image>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ flex: 1, marginLeft: s(-15) }}>
          <TextTip {...tips}></TextTip>
        </View>

        <Button
          backgroundColor="transparent"
          text="CANCEL"
          textColor={colors.grey80}
        ></Button>
      </View>
    </BottomSheet>
  );
}
export default index;

const styles = ScaledSheet.create({
  credit: {
    width: '100%',
    maxHeight: '80@vs',
    resizeMode: 'contain',
    marginVertical: '25@vs',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
