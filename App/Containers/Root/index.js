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
import useAlert from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";

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
      actionSheet,
      loading: { spinner },
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const {
    showSheet,
    children,
    height,
    onCloseEnd,
    sheetTitle,
    enabledGestureInteraction,
  } = actionSheet;
  const sheetEl = useRef(null);
  const fall = new Animated.Value(0);
  const {
    visible: alertShow,
    message: alertMessage,
    title: alertTitle,
    color: alertColor,
    onDismiss: alertDissmiss,
  } = useAlert();
  const { show } = useLoading();
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch({ type: "changAlertState", payload: { visible: false } });
      }, 2100);
    }
  }, [visible]);
  return (
    <AlertContext.Provider value={{ dispatch, actionSheet }}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Spinner
          visible={spinner || show}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
        />
        <AppNavigation />
      </View>
      {showSheet && (
        <TouchableWithoutFeedback
          disabled={true}
          onPress={() => {
            dispatch({
              type: "changSheetState",
              payload: {
                showSheet: false,
                height: 200,
                children: () => null,
                sheetTitle: "",
              },
            });
          }}
        >
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
          {children ? (
            typeof children === "function" ? (
              children()
            ) : typeof children === "object" ? (
              children
            ) : (
              <Text></Text>
            )
          ) : (
            <Text></Text>
          )}
        </BottomSheet>
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
      {alertShow && (
        <Alert
          visible={true}
          message={alertMessage}
          title={alertTitle}
          color={alertColor}
          onDismiss={alertDissmiss}
        />
      )}
    </AlertContext.Provider>
  );
}
export default RootContainer;
