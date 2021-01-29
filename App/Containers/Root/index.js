import React, { Component, useContext, useEffect, useReducer } from 'react';
import { View, StatusBar } from 'react-native';
import { Alert } from '../../Components';
import AppNavigation from '../../Navigation/AppNavigation';
import colors from '../../Themes/Colors';

export const AlertContext = React.createContext({});
const initialState = {
  visible: false,
  message: '',
  title: '',
  color: colors.success,
  onDismiss: () => {},
};
function reducer(state, action) {
  console.log('====================================');
  console.log({ ...state, ...action.payload });
  console.log('====================================');
  switch (action.type) {
    case 'changAlertState':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
function RootContainer() {
  const [{ visible, message, color, onDismiss, title }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch({ type: 'changAlertState', payload: { visible: false } });
      }, 2100);
    }
  }, [visible]);
  return (
    <AlertContext.Provider value={{ dispatch }}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <AppNavigation />
        <Alert
          visible={visible}
          message={message}
          title={title}
          color={color}
          onDismiss={onDismiss}
        />
      </View>
    </AlertContext.Provider>
  );
}

export default RootContainer;
