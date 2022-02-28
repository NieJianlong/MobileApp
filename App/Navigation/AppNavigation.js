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
import NavigationService from "./NavigationService";
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
import CheckoutNoAuthScreen from "../Containers/CheckoutNoAuth";
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
import ReportGroupScreen from "../Containers/ReportGroup";
import TabBar from "./TabBar";
import ReturnsUnavailable from "../Containers/ReturnsUnavailable/ReturnsUnavailable";
import ReturnInformation from "../Containers/Orders/ReturnInformation";
// import ReturnInformation from "../..";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();

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
      headerMode={"none"}
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
          // headerTintColor: "#21c064",
          // headerTitleStyle: styles.headerTitleStyle,
          cardStyleInterpolator: cardStyleInterpolator,
        };
      }}
    >
      <Stack.Screen
        name={"LaunchScreen"}
        component={LaunchScreen}
        screenOptions={{ gesturesEnabled: false }}
      />
      <Stack.Screen name={"MainScreen"} component={TabNav} />
      <Stack.Screen name={"OnboardingScreen"} component={OnboardingScreen} />
      <Stack.Screen
        name={"ProductDetailScreen"}
        component={ProductDetailScreen}
      />
      <Stack.Screen name={"ReturnInformation"} component={ReturnInformation} />
      <Stack.Screen
        name={"ProductGalleryScreen"}
        component={ProductGalleryScreen}
      />
      <Stack.Screen name={"ProductInfoScreen"} component={ProductInfoScreen} />
      <Stack.Screen
        name={"ReturnsUnavailable"}
        component={ReturnsUnavailable}
      />
      <Stack.Screen
        name={"ProductSearchScreen"}
        component={ProductSearchScreen}
      />
      <Stack.Screen
        name={"EditCategoriesScreen"}
        component={EditCategoriesScreen}
      />
      <Stack.Screen
        name={"ChooseCategoriesScreen"}
        component={ChooseCategoriesScreen}
      />
      <Stack.Screen name={"RateOrderScreen"} component={RateOrderScreen} />
      <Stack.Screen name={"ReportScreen"} component={ReportScreen} />
      <Stack.Screen name={"OrderPlacedScreen"} component={OrderPlacedScreen} />
      <Stack.Screen name={"OrderDetailScreen"} component={OrderDetailScreen} />
      <Stack.Screen name={"RateSellerScreen"} component={RateSellerScreen} />
      <Stack.Screen name={"SellerStoreScreen"} component={SellerStoreScreen} />
      <Stack.Screen name={"InvoiceScreen"} component={InvoiceScreen} />
      <Stack.Screen name={"GroupInfoScreen"} component={GroupInfoScreen} />
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
      <Stack.Screen name={"LegalScreen"} component={LegalScreen} />
      <Stack.Screen name={"UserInfoScreen"} component={UserInfoScreen} />
      <Stack.Screen
        name={"UserEditProfileScreen"}
        component={UserEditProfileScreen}
      />
      <Stack.Screen
        name={"DeleteAccountMessageScreen"}
        component={DeleteAccountMessageScreen}
      />
      <Stack.Screen
        name={"ChangePasswordScreen"}
        component={ChangePasswordScreen}
      />
      <Stack.Screen name={"OTPScreen"} component={OTPScreen} />
      <Stack.Screen
        name={"AddNewAddressScreen"}
        component={AddNewAddressScreen}
      />
      <Stack.Screen
        name={"ForgotPasswordScreen"}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={"AddPaymentMethodScreen"}
        component={AddPaymentMethodScreen}
      />
      <Stack.Screen name={"AddCreditScreen"} component={AddCreditScreen} />
      <Stack.Screen
        name={"CreateNewPasswordScreen"}
        component={CreateNewPasswordScreen}
      />
      <Stack.Screen
        name={"AddBillingDetailsScreen"}
        component={AddBillingDetailsScreen}
      />
      <Stack.Screen
        name={"EditBillingDetailsScreen"}
        component={EditBillingDetailsScreen}
      />
      <Stack.Screen
        name={"OneClickPurchaseScreen"}
        component={OneClickPurchaseScreen}
      />
      <Stack.Screen
        name={"SelectDeliveryAddressScreen"}
        component={SelectDeliveryAddressScreen}
      />
      <Stack.Screen
        name={"SalamiCreditScreen"}
        component={SalamiCreditScreen}
      />
      <Stack.Screen name={"UserCenter"} component={UserCenter} />
      <Stack.Screen
        name={"NotificationsScreen"}
        component={NotificationsScreen}
      />
      <Stack.Screen name={"SettingScreen"} component={SettingScreen} />
      <Stack.Screen
        name={"SelectCountryOrLanguageScreen"}
        component={SelectCountryOrLanguageScreen}
      />
      <Stack.Screen
        name={"CustomerSupportScreen"}
        component={CustomerSupportScreen}
      />
      <Stack.Screen name={"FeedbackScreen"} component={FeedbackScreen} />
      <Stack.Screen
        name={"ShoppingCartScreen"}
        component={ShoppingCartScreen}
      />
      <Stack.Screen
        name={"EditShoppingCartScreen"}
        component={EditShoppingCartScreen}
      />
      <Stack.Screen
        name={"CheckoutNoAuthScreen"}
        component={CheckoutNoAuthScreen}
      />
      <Stack.Screen
        name={"CheckOutPersonalDetailsScreen"}
        component={CheckOutPersonalDetailsScreen}
      />
      <Stack.Screen
        name={"CheckoutBillingDetailsScreen"}
        component={CheckoutBillingDetailsScreen}
      />
      <Stack.Screen
        name={"AddCheckoutPaymentMethodScreen"}
        component={AddCheckoutPaymentMethodScreen}
      />
      <Stack.Screen
        name={"CheckoutResumeScreen"}
        component={CheckoutResumeScreen}
      />
      <Stack.Screen
        name={"InSufficientSalamiCreditScreen"}
        component={InSufficientSalamiCreditScreen}
      />
      <Stack.Screen
        name={"CheckoutPaymentCompletedScreen"}
        component={CheckoutPaymentCompletedScreen}
      />
      <Stack.Screen
        name={"CheckoutPaymentCompletedGuestScreen"}
        component={CheckoutPaymentCompletedGuestScreen}
      />
      <Stack.Screen name={"ChatScreen"} component={ChatScreen} />
      {/* <Stack.Screen
        name={"OrderGroupInfoScreen"}
        component={OrderGroupInfoScreen}
      /> */}
      <Stack.Screen name={"TrackOrderScreen"} component={TrackOrderScreen} />
      <Stack.Screen name={"CancelOrderScreen"} component={CancelOrderScreen} />
      <Stack.Screen
        name={"AskForReplacementScreen"}
        component={AskForReplacementScreen}
      />
      <Stack.Screen
        name={"ReturnProductStep3Screen"}
        component={ReturnProductStep3Screen}
      />
      <Stack.Screen
        name={"ReturnProductStep2Screen"}
        component={ReturnProductStep2Screen}
      />
      <Stack.Screen
        name={"ReturnProductStep1Screen"}
        component={ReturnProductStep1Screen}
      />
      <Stack.Screen name={"RefundScreen"} component={RefundScreen} />
      <Stack.Screen
        name={"CancelOrderCompletedScreen"}
        component={CancelOrderCompletedScreen}
      />
      <Stack.Screen name={"ReportGroupScreen"} component={ReportGroupScreen} />
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
export default class AppRouter extends React.Component {
  render() {
    return (
      <NavigationContainer
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >
        <PrimaryNav />
      </NavigationContainer>
    );
  }
}
