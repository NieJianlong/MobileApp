import React, { useEffect, useReducer, useRef } from "react";
import {
  View,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Alert, BottomSheet } from "../../Components";
import AppNavigation from "../../Navigation/AppNavigation";
import colors from "../../Themes/Colors";
import { vs } from "react-native-size-matters";
import { AlertContext } from "./GlobalContext";
import Spinner from "react-native-loading-spinner-overlay";

const initialState = {
  alert: {
    visible: false,
    message: "",
    title: "",
    color: colors.success,
    onDismiss: () => {},
  },
  actionSheet: {
    showSheet: false,
    children: null,
    height: 200,
    sheetTitle: "",
    onCloseEnd: () => {},
    enabledGestureInteraction: true,
  },
  loading: {
    spinner: false,
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "changAlertState":
      return { ...state, alert: { ...action.payload } };
    case "changSheetState":
      return {
        ...state,
        actionSheet: { ...state.actionSheet, ...action.payload },
      };
    case "changLoading":
      return { ...state, loading: { spinner: action.payload } };
    case "loading":
      return { ...state, loading: { spinner: true } };
    case "hideloading":
      return { ...state, loading: { spinner: false } };
    default:
      throw new Error();
  }
}
function RootContainer() {
  const [
    {
      alert: { visible, message, color, onDismiss, title },
      actionSheet: {
        showSheet,
        children,
        height,
        onCloseEnd,
        sheetTitle,
        enabledGestureInteraction,
      },
      loading: { spinner },
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const sheetEl = useRef(null);
  const fall = new Animated.Value(0);
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch({ type: "changAlertState", payload: { visible: false } });
      }, 2100);
    }
  }, [visible]);
  return (
    <AlertContext.Provider value={{ dispatch }}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Spinner
          visible={spinner}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
        />
        <AppNavigation />
        {visible && (
          <Alert
            visible={true}
            message={message}
            title={title}
            color={color}
            onDismiss={onDismiss}
          />
        )}
      </View>
      {showSheet && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              backgroundColor: "rgb(29,29,29)",
              opacity: Animated.add(0.85, Animated.multiply(-1.0, fall)),
            }}
          />
        </TouchableWithoutFeedback>
      )}
      {showSheet && (
        <BottomSheet
          customRef={sheetEl}
          enabledGestureInteraction={enabledGestureInteraction}
          onCloseEnd={() => {
            // onCloseEnd
            //   ? onCloseEnd()
            dispatch({
              type: "changSheetState",
              payload: { showSheet: false },
            });
            onCloseEnd && onCloseEnd();
          }}
          // callbackNode={new Animated.Value(0)}
          snapPoints={[vs(height), 0]}
          initialSnap={0}
          title={sheetTitle || null}
        >
          {children()}
        </BottomSheet>
      )}
    </AlertContext.Provider>
  );
}
export default RootContainer;
