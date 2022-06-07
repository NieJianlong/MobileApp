import React, { useEffect, useReducer, useRef } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  SafeAreaView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Alert, BottomSheet } from "../../Components";
import AppNavigation from "../../Navigation/AppNavigation";
import colors from "../../Themes/Colors";
import { vs } from "react-native-size-matters";
import { AlertContext } from "./GlobalContext";
import Spinner from "react-native-loading-spinner-overlay";
import useAlert from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";
import ImageViewer from "react-native-image-zoom-viewer";
import useImageViewer from "../../hooks/useImageViewer";
import useLogin from "../../hooks/useLogin";
import MapScreen from "../MapScreen";
import useMapScreen from "../../hooks/useMapScreen";
import useRegister from "../../hooks/useRegister";
import RegisterScreen from "../Register";
import { t } from "react-native-tailwindcss";
import RegisterGuestBuyerToBuyerScreen from "../RegisterGuestBuyerToBuyer";
import { Portal, Text } from "react-native-paper";
import LoginModalForm from "../LoginModalForm";
import { Colors, Images } from "../../Themes";
import CheckoutPaymentCompletedGuest from "../CheckoutPaymentCompletedGuest";
import useRegisterGuest from "../../hooks/useRegisterGuest";
import { useValidateBuyerHasAnyOrderLazyQuery } from "../../../generated/graphql";
import LoginScreen from "../Login";
import { _navigator } from "../../Navigation/NavigationService";

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
  const { setShowMap } = useMapScreen();
  const { visibleRegister, setRegister } = useRegisterGuest();
  const [validateBuyerHasAnyOrder] = useValidateBuyerHasAnyOrderLazyQuery({
    onCompleted: (res) => {
      if (res.validateBuyerHasAnyOrder) {
        setRegister({ visibleRegister: res.validateBuyerHasAnyOrder });
      }
    },
  });
  // useEffect(() => {
  //   if (!global.access_token && global.buyerId) {
  //     validateBuyerHasAnyOrder({ variables: { buyerId: global.buyerId } });
  //   }
  // }, [global.access_token, global.buyerId]);

  // useEffect(() => {

  // }, []);
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      dispatch({
        type: "changSheetState",
        payload: {
          showSheet: false,
          height: 380,
          children: () => null,
          onCloseEnd: () => {},
          sheetTitle: "",
        },
      });
      setShowMap({ mapVisible: false, stopPermission: true });
      return false;
    });

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app requires location permission.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use location services");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    //requestLocationPermission();
  }, []);

  const {
    visible: imageViewerVisible,
    images,
    setImageViewer,
  } = useImageViewer();
  const { loginVisible } = useLogin();
  const { mapVisible } = useMapScreen();
  const { stopPermission} = useMapScreen();
  const { width, height: windowHeight } = useWindowDimensions();
  return (
    <AlertContext.Provider value={{ dispatch, actionSheet }}>
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
      {/* <Modal visible={visibleRegister} transparent={true}>
        <RegisterGuestBuyerToBuyerScreen style={[t.pX0]} />
      </Modal> */}
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

      <Modal visible={visibleRegister} transparent={true}>
        <CheckoutPaymentCompletedGuest />
      </Modal>

      <Modal visible={imageViewerVisible} transparent={true}>
        <View style={[{ width, height: windowHeight }]}>
          <ImageViewer
            imageUrls={images}
            backgroundColor={Colors.white}
            onClick={() => {
              setImageViewer({ visible: false, images: [] });
            }}
          />
          <SafeAreaView
            style={[t.absolute, Platform.OS === "android" ? t.mT8 : t.mT0]}
          >
            <TouchableOpacity
              onPress={() => {
                setImageViewer({ visible: false, images: [] });
              }}
            >
              <View style={[t.h12, t.w12, t.mL4]}>
                <Image
                  source={Images.arrow_left}
                  style={[t.w8, t.h8, { tintColor: "#000000" }]}
                />
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>

      {/* <Modal visible={true}>
        <LoginModalForm />
      </Modal> */}

      {/* {loginVisible && <LoginScreen />} */}

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
      <Modal visible={mapVisible} transparent={true}>
        <MapScreen stopPermission={stopPermission} />
      </Modal>
      <Modal visible={spinner || show} transparent={true}>
        <Spinner
          visible={spinner || show}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
        />
      </Modal>
    </AlertContext.Provider>
  );
}
export default RootContainer;
