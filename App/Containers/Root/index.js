import React, { useEffect, useReducer, useRef } from 'react';
import {
  View,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Alert, BottomSheet } from '../../Components';
import AppNavigation from '../../Navigation/AppNavigation';
import colors from '../../Themes/Colors';
import { vs } from 'react-native-size-matters';
import { AlertContext } from './GlobalContext';

const initialState = {
  alert: {
    visible: false,
    message: '',
    title: '',
    color: colors.success,
    onDismiss: () => {},
  },
  actionSheet: {
    showSheet: false,
    children: null,
    height: 200,
    onCloseEnd: () => {},
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'changAlertState':
      return { ...state, alert: { ...action.payload } };
    case 'changSheetState':
      return {
        ...state,
        actionSheet: { ...state.actionSheet, ...action.payload },
      };
    default:
      throw new Error();
  }
}
function RootContainer() {
  const [
    {
      alert: { visible, message, color, onDismiss, title },
      actionSheet: { showSheet, children, height, onCloseEnd },
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const sheetEl = useRef(null);
  const fall = new Animated.Value(0);
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
      {showSheet && (
        <BottomSheet
          customRef={sheetEl}
          onCloseEnd={() => {
            dispatch({
              type: 'changSheetState',
              payload: { showSheet: false },
            });
          }}
          // callbackNode={new Animated.Value(0)}
          snapPoints={[vs(height), 0]}
          initialSnap={0}
          // title={'Add your delivery address'}
        >
          {children()}
        </BottomSheet>
      )}
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
    </AlertContext.Provider>
  );
}
export default RootContainer;
