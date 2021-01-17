/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 15:54:53
 * @LastEditTime: 2021-01-09 14:57:59
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Screen
 * @FilePath: /MobileApp/App/Containers/UserInfo/index.js
 */
import React, { useReducer, useEffect } from 'react';
import { View } from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import { AppBar, Alert } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';
import HorizontalMenu from './HorizontalMenu';

export const AlertContext = React.createContext({});
const initialState = {
  visible: false,
  message: '',
  title: '',
  color: colors.success,
  onDismiss: () => {},
  action: () => {},
};
function reducer(state, action) {
  switch (action.type) {
    case 'changAlertState':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

function index(props) {
  const [{ visible, message, color, onDismiss, title }, dispatch] = useReducer(
    reducer,
    initialState
  );
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
    </AlertContext.Provider>
  );
}

export default index;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
