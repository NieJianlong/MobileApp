import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LaunchScreen from "../Containers/Launch";
import OnboardingScreen from "../Containers/Onboarding";
import ExploreScreen from "../Containers/Explore";
import ProductDetailScreen from "../Containers/Explore/ProductDetail";
import ProductGalleryScreen from "../Containers/Explore/ProductGallery";
import ProductInfoScreen from "../Containers/Explore/ProductInfo";
import ProductSearchScreen from "../Containers/Explore/Search";
import EditCategoriesScreen from "../Containers/Explore/Categories/Edit";
import ChooseCategoriesScreen from "../Containers/Explore/Categories/Choose";
import RateOrderScreen from "../Containers/Explore/RateOrder";
import ReportScreen from "../Containers/Explore/Report";
import RateSellerScreen from "../Containers/Orders/RateSeller";
import SellerStoreScreen from "../Containers/Explore/SellerStore";
import OrderPlacedScreen from "../Containers/Explore/OrderPlaced";
import OrderScreen from "../Containers/Orders/MainScreen";
import GroupInfoScreen from "../Containers/Orders/GroupInfo";
import OrderDetailScreen from "../Containers/Orders/OrderDetail";
import InvoiceScreen from "../Containers/Orders/Invoice";
import LoginScreen from "../Containers/Login";
import RegisterScreen from "../Containers/Register";
import LegalScreen from "../Containers/Legal";
import OTPScreen from "../Containers/OTP";
import ForgotPasswordScreen from "../Containers/ForgotPassword";
import CreateNewPasswordScreen from "../Containers/CreateNewPassword";
import WishlistScreen from "../Containers/Wishlist";
import UserCenter from "../Containers/UserCenter";
import UserInfoScreen from "../Containers/UserInfo";
import UserEditProfileScreen from "../Containers/UserEditProfile";
import DeleteAccountMessageScreen from "../Containers/DeleteAccountMessage";
import AddNewAddressScreen from "../Containers/AddNewAddress";
import NavigationService, { _navigator } from "./NavigationService";
import ChangePasswordScreen from "../Containers/ChangePassword";
import AddPaymentMethodScreen from "../Containers/AddPaymentMethod";
import AddCreditScreen from "../Containers/AddCredit";
import AddBillingDetailsScreen from "../Containers/AddBillingDetails";
import EditBillingDetailsScreen from "../Containers/EditBillingDetails";
import OneClickPurchaseScreen from "../Containers/OneClickPurchase";
import SelectDeliveryAddressScreen from "../Containers/SelectDeliveryAddress";
import SalamiCreditScreen from "../Containers/SalamiCredit";
import NotificationsScreen from "../Containers/Notifications";
import SettingScreen from "../Containers/Setting";
import SelectCountryOrLanguageScreen from "../Containers/SelectCountryOrLanguage";
import CustomerSupportScreen from "../Containers/CustomerSupport";
import FeedbackScreen from "../Containers/Feedback";
import ShoppingCartScreen from "../Containers/ShoppingCart";
import EditShoppingCartScreen from "../Containers/EditShoppingCart";
import CheckoutAuthScreen from "../Containers/CheckoutAuth";
import CheckOutPersonalDetailsScreen from "../Containers/CheckOutPersonalDetails";
import CheckoutBillingDetailsScreen from "../Containers/CheckoutBillingDetails";
import AddCheckoutPaymentMethodScreen from "../Containers/AddCheckoutPaymentMethod";
import CheckoutResumeScreen from "../Containers/CheckoutResume";
import InSufficientSalamiCreditScreen from "../Containers/InSufficientSalamiCredit";
import CheckoutPaymentCompletedScreen from "../Containers/CheckoutPaymentCompleted";
import CheckoutPaymentCompletedGuestScreen from "../Containers/CheckoutPaymentCompletedGuest";
import ChatScreen from "../Containers/Chat";
// import OrderGroupInfoScreen from "../Containers/OrderGroupInfo";
import TrackOrderScreen from "../Containers/TrackOrder";
import CancelOrderScreen from "../Containers/CancelOrder";
import AskForReplacementScreen from "../Containers/AskForReplacement";
import ReturnProductStep3Screen from "../Containers/ReturnProductStep3";
import ReturnProductStep1Screen from "../Containers/ReturnProductStep1";
import ReturnProductStep2Screen from "../Containers/ReturnProductStep2";
import RefundScreen from "../Containers/Refund";
import CancelOrderCompletedScreen from "../Containers/CancelOrderCompleted";
import TabBar from "./TabBar";
import {
  Page_BillingDetails,
  Page_CheckoutAuth,
  Page_CheckoutGuestOrderDetail,
} from "./const";
import CheckoutGuestOrderDetail from "../Containers/CheckoutGuestOrderDetail";
import BillingDetails from "../Containers/BillingDetails";
import ReturnsUnavailable from "../Containers/ReturnsUnavailable/ReturnsUnavailable";
import ReturnInformation from "../Containers/Orders/ReturnInformation";
import ReturnStatus from "../Containers/Orders/ReturnStatus/index";
import LearnMore from "../Containers/LearnMore/index";
import NavigationLeftButton from "../Components/NavigationLeftButton";
import { t } from "react-native-tailwindcss";
import { ApplicationStyles, Colors, Images } from "../Themes";
import RegisterGuestBuyerToBuyerScreen from "../Containers/RegisterGuestBuyerToBuyer";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import styles from "../Containers/Explore/styles";
import colors from "../Themes/Colors";
import useCurrentRoute from "../hooks/useCurrentRoute";
// import ReturnInformation from "../..";
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name={"ExploreScreen"} component={ExploreScreen} />
      <Tab.Screen name={"PackageScreen"} component={OrderScreen} />
      <Tab.Screen name={"CartScreen"} component={ShoppingCartScreen} />
      <Tab.Screen name={"FollowScreen"} component={WishlistScreen} />
      <Tab.Screen name={"MenuScreen"} component={UserCenter} />
    </Tab.Navigator>
  );
}

function PrimaryNav() {
  return (
    <Stack.Navigator
      initialRouteName={"LaunchScreen"}
      mode={"card"}
      // screenOptions={({ route, navigation }) => {
      //   let cardStyleInterpolator = CardStyleInterpolators.forHorizontalIOS;
      //   return {
      //     headerLeft: ({ canGoBack }) => {
      //       return canGoBack ? <NavigationLeftButton /> : null;
      //     },
      //     headerLeftContainerStyle: t.mL4,
      //     cardStyleInterpolator: cardStyleInterpolator,
      //   };
      // }}
      screenOptions={({ route, navigation }) => {
        let cardStyleInterpolator = CardStyleInterpolators.forHorizontalIOS;
        switch (route.name) {
          case "MainScreen":
            cardStyleInterpolator = CardStyleInterpolators.forNoAnimation;
            break;
          default:
            break;
        }
        return {
          headerLeft: ({ canGoBack }) => {
            return canGoBack ? <NavigationLeftButton /> : null;
          },
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          // headerTransparent: true,
          // headerTintColor: "#21c064",
          // headerTitleStyle: styles.headerTitleStyle,
          gestureEnabled: false,
          cardStyleInterpolator: cardStyleInterpolator,
        };
      }}
    >
      <Stack.Screen
        name={"LaunchScreen"}
        component={LaunchScreen}
        screenOptions={{ gesturesEnabled: false }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"RegisterGuestBuyerToBuyer"}
        component={RegisterGuestBuyerToBuyerScreen}
        screenOptions={{ gesturesEnabled: false }}
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name={"MainScreen"}
        component={TabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"OnboardingScreen"}
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"ProductDetailScreen"}
        component={ProductDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ReturnStatus"}
        component={ReturnStatus}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ReturnInformation"}
        component={ReturnInformation}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ProductGalleryScreen"}
        component={ProductGalleryScreen}
      />
      <Stack.Screen
        name={"ProductInfoScreen"}
        component={ProductInfoScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ReturnsUnavailable"}
        component={ReturnsUnavailable}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ProductSearchScreen"}
        component={ProductSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"EditCategoriesScreen"}
        component={EditCategoriesScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ChooseCategoriesScreen"}
        component={ChooseCategoriesScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"RateOrderScreen"}
        component={RateOrderScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ReportScreen"}
        component={ReportScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen name={"OrderPlacedScreen"} component={OrderPlacedScreen} />
      <Stack.Screen
        name={"OrderDetailScreen"}
        component={OrderDetailScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"RateSellerScreen"}
        component={RateSellerScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"SellerStoreScreen"}
        component={SellerStoreScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"InvoiceScreen"}
        component={InvoiceScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"GroupInfoScreen"}
        component={GroupInfoScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Group Info",
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },

          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{
          gesturesEnabled: false,
          header: () => (
            <View
              style={[
                t.bgWhite,
                t.flexRow,
                t.justifyBetween,
                t.h24,
                t.itemsEnd,
              ]}
            >
              <View style={{ width: 36, height: 36 }} />
              {/* <Image
                source={Images.logo4}
                style={[styles.logo, t.mT4]}
                resizeMode={"contain"}
              /> */}
              <View style={{ width: 36, height: 36 }} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={"RegisterScreen"}
        component={RegisterScreen}
        options={{
          header: () => (
            <View
              style={[
                t.bgWhite,
                t.flexRow,
                t.justifyBetween,
                t.h24,
                t.itemsEnd,
                { backgroundColor: colors.background },
              ]}
            >
              <NavigationLeftButton style={[t.mB2]} />
              <Image
                source={Images.logo4}
                style={[styles.logo, t.mT4]}
                resizeMode={"contain"}
              />
              <View style={{ width: 36, height: 36 }} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={"LegalScreen"}
        component={LegalScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"UserInfoScreen"}
        component={UserInfoScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"UserEditProfileScreen"}
        component={UserEditProfileScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Update your details",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"DeleteAccountMessageScreen"}
        component={DeleteAccountMessageScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ChangePasswordScreen"}
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"OTPScreen"}
        component={OTPScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"AddNewAddressScreen"}
        component={AddNewAddressScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ForgotPasswordScreen"}
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"AddPaymentMethodScreen"}
        component={AddPaymentMethodScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"AddCreditScreen"}
        component={AddCreditScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CreateNewPasswordScreen"}
        component={CreateNewPasswordScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"AddBillingDetailsScreen"}
        component={AddBillingDetailsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"EditBillingDetailsScreen"}
        component={EditBillingDetailsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"OneClickPurchaseScreen"}
        component={OneClickPurchaseScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"SelectDeliveryAddressScreen"}
        component={SelectDeliveryAddressScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"SalamiCreditScreen"}
        component={SalamiCreditScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen name={"UserCenter"} component={UserCenter} />
      <Stack.Screen
        name={"NotificationsScreen"}
        component={NotificationsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"SettingScreen"}
        component={SettingScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"SelectCountryOrLanguageScreen"}
        component={SelectCountryOrLanguageScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CustomerSupportScreen"}
        component={CustomerSupportScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Support",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"FeedbackScreen"}
        component={FeedbackScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ShoppingCartScreen"}
        component={ShoppingCartScreen}
      />
      <Stack.Screen
        name={"EditShoppingCartScreen"}
        component={EditShoppingCartScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={Page_CheckoutAuth}
        component={CheckoutAuthScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CheckOutPersonalDetailsScreen"}
        component={CheckOutPersonalDetailsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CheckoutBillingDetailsScreen"}
        component={CheckoutBillingDetailsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"AddCheckoutPaymentMethodScreen"}
        component={AddCheckoutPaymentMethodScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CheckoutResumeScreen"}
        component={CheckoutResumeScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Review your details",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"InSufficientSalamiCreditScreen"}
        component={InSufficientSalamiCreditScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CheckoutPaymentCompletedScreen"}
        component={CheckoutPaymentCompletedScreen}
      />
      <Stack.Screen
        name={"CheckoutPaymentCompletedGuestScreen"}
        component={CheckoutPaymentCompletedGuestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={"ChatScreen"} component={ChatScreen} />
      {/* <Stack.Screen
        name={"OrderGroupInfoScreen"}
        component={OrderGroupInfoScreen}
      /> */}
      <Stack.Screen
        name={"TrackOrderScreen"}
        component={TrackOrderScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CancelOrderScreen"}
        component={CancelOrderScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"AskForReplacementScreen"}
        component={AskForReplacementScreen}
      />
      <Stack.Screen
        name={"ReturnProductStep3Screen"}
        component={ReturnProductStep3Screen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ReturnProductStep2Screen"}
        component={ReturnProductStep2Screen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"ReturnProductStep1Screen"}
        component={ReturnProductStep1Screen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"RefundScreen"}
        component={RefundScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={"CancelOrderCompletedScreen"}
        component={CancelOrderCompletedScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />

      <Stack.Screen
        name={"LearnMoreScreen"}
        component={LearnMore}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={Page_CheckoutGuestOrderDetail}
        component={CheckoutGuestOrderDetail}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
      <Stack.Screen
        name={Page_BillingDetails}
        component={BillingDetails}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { ...ApplicationStyles.screen.heading5Regular },
        }}
      />
    </Stack.Navigator>
  );
}
// function RootStackScreen() {
//   return (
//     <LoginStack.Navigator mode="modal" headerMode={"none"}>
//       {/*  */}
//       <LoginStack.Screen name="PrimaryNav" component={PrimaryNav} />
//       <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
//     </LoginStack.Navigator>
//   );
// }

function AppRouter(props) {
  const { setCurrentRoute } = useCurrentRoute();
  return (
    <NavigationContainer
      onStateChange={() => {
        const routeName = _navigator?.getCurrentRoute()?.name;

        setCurrentRoute({ currentPage: routeName });
      }}
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
        // navigatorRef?.current?.addListener("state", (e) => {
        //
        //   const state = e.data.state; //works
        // });
      }}
    >
      <PrimaryNav />
    </NavigationContainer>
  );
}

export default AppRouter;
