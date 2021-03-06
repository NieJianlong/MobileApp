/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 15:54:53
 * @LastEditTime: 2021-01-24 14:03:12
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Screen
 * @FilePath: /MobileApp/App/Containers/UserInfo/index.js
 */
import React, { useReducer, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import {
  AppBar,
  Alert,
  BottomSheet,
  Button,
  RightButton,
} from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';
import HorizontalMenu from './HorizontalMenu';
import images from '../../Themes/Images';
import TextTip from '../../Components/EmptyReminder';
import NavigationService from '../../Navigation/NavigationService';
import { ApplicationStyles } from '../../Themes';

//Alert Context, which controls the display and hiding of an alert, for example, Add Address Success
export const AlertContext = React.createContext({});
//reducer,useContext+useReducer,It is easy for child components to control parent components
const initialState = {
  visible: false,
  message: '',
  title: '',
  color: colors.success,
  onDismiss: () => {},
  action: () => {},
  showSheet: false,
  rightButtonShow: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'changAlertState':
      return { ...state, ...action.payload };
    case 'showPaymentRemoveSheet':
      return { ...state, ...action.payload };
    case 'rightButtonShow':
      return { ...state, rightButtonShow: action.payload };
    default:
      throw new Error();
  }
}
/**
 * @description: userInfo screen
 * @param {*} props
 * @return {*}
 */
function UserInfo(props) {
  const [
    { visible, message, color, onDismiss, title, showSheet, rightButtonShow },
    dispatch,
  ] = useReducer(reducer, initialState);
  const sheetEl = useRef(null);
  fall = new Animated.Value(0);
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch({ type: 'changAlertState', payload: { visible: false } });
      }, 2100);
    }
  }, [visible]);
  return (
    <AlertContext.Provider value={{ dispatch }}>
      {showSheet && renderSheet(sheetEl, dispatch)}
      <View style={styles.container}>
        <SafeAreaView style={{ maxHeight: 64 }}>
          <AppBar
            rightButton={() =>
              rightButtonShow ? (
                <RightButton
                  title="EDIT"
                  onPress={() => {
                    NavigationService.navigate('EditBillingDetailsScreen', {
                      saveCallback: () => {},
                      removeCallback: () => {
                        dispatch({
                          type: 'changAlertState',
                          payload: {
                            visible: true,
                            message:
                              'You have successfully removed your billing address.',
                            color: colors.secondary00,
                            title: 'Billing Details removed',
                          },
                        });
                      },
                    });
                  }}
                />
              ) : null
            }
          />
        </SafeAreaView>
        <View style={{ marginBottom: vs(15) }}>
          <UserHeader needEdit></UserHeader>
        </View>
        <HorizontalMenu dispatch={dispatch}></HorizontalMenu>
      </View>
      {showSheet && (
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
      )}
      {visible && (
        <Alert
          visible={true}
          message={message}
          title={title}
          color={color}
          onDismiss={onDismiss}
        />
      )}
    </AlertContext.Provider>
  );
}
/**
 * @description: action sheet,like remove payment method
 * @param {*} sheetEl
 * @param {*} dispatch
 * @return {*}
 */
function renderSheet(sheetEl, dispatch) {
  const tips = {
    textTip: 'Remove Payment Method',
    subTextTip: 'This action cannot be undone,\n are you sure?',
    needButton: true,
    btnMsg: 'SURE!',
    onPress: (callback) => {
      callback();
    },
    callback: () => {
      dispatch({
        type: 'changAlertState',
        payload: {
          visible: true,
          message: 'You have successfully removed your payment method.',
          color: colors.secondary00,
          title: 'Payment method removed',
          showSheet: false,
        },
      });
    },
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
export default UserInfo;

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
