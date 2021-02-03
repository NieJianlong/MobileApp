import * as React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LaunchScreen from '../Containers/Launch';
import OnboardingScreen from '../Containers/Onboarding';
import ExploreScreen from '../Containers/Explore';
import ProductDetailScreen from '../Containers/Explore/ProductDetail';
import ProductGalleryScreen from '../Containers/Explore/ProductGallery';
import ProductInfoScreen from '../Containers/Explore/ProductInfo';
import ProductSearchScreen from '../Containers/Explore/Search';
import EditCategoriesScreen from '../Containers/Explore/Categories/Edit';
import ChooseCategoriesScreen from '../Containers/Explore/Categories/Choose';
import LoginScreen from '../Containers/Login';
import RegisterScreen from '../Containers/Register';
import LegalScreen from '../Containers/Legal';
import OTPScreen from '../Containers/OTP';
import ForgotPasswordScreen from '../Containers/ForgotPassword';
import CreateNewPasswordScreen from '../Containers/CreateNewPassword';
import UserCenter from '../Containers/UserCenter';
import UserInfoScreen from '../Containers/UserInfo';
import UserEditProfileScreen from '../Containers/UserEditProfile';
import DeleteAccountMessageScreen from '../Containers/DeleteAccountMessage';
import AddNewAddressScreen from '../Containers/AddNewAddress';
import NavigationService from './NavigationService';
import ChangePasswordScreen from '../Containers/ChangePassword';
import AddPaymentMethodScreen from '../Containers/AddPaymentMethod';
import AddCreditScreen from '../Containers/AddCredit';
import AddBillingDetailsScreen from '../Containers/AddBillingDetails';
import EditBillingDetailsScreen from '../Containers/EditBillingDetails';
import OneClickPurchaseScreen from '../Containers/OneClickPurchase';
import SelectDeliveryAddressScreen from '../Containers/SelectDeliveryAddress';
import SalamiCreditScreen from '../Containers/SalamiCredit';
import NotificationsScreen from '../Containers/Notifications';
import SettingScreen from '../Containers/Setting';
import TabBar from './TabBar';

const TabNav = createBottomTabNavigator(
  {
    ExploreScreen: { screen: ExploreScreen },
    PackageScreen: { screen: ExploreScreen },
    CartScreen: { screen: ExploreScreen },
    FollowScreen: { screen: ExploreScreen },
    MenuScreen: { screen: UserCenter },
  },
  {
    tabBarComponent: (props) => <TabBar {...props} />,
  }
);

const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    MainScreen: { screen: TabNav },
    OnboardingScreen: { screen: OnboardingScreen },
    ExploreScreen: { screen: ExploreScreen },
    ProductDetailScreen: { screen: ProductDetailScreen },
    ProductGalleryScreen: { screen: ProductGalleryScreen },
    ProductInfoScreen: { screen: ProductInfoScreen },
    ProductSearchScreen: { screen: ProductSearchScreen },
    EditCategoriesScreen: { screen: EditCategoriesScreen },
    ChooseCategoriesScreen: { screen: ChooseCategoriesScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    LegalScreen: { screen: LegalScreen },
    UserInfoScreen: { screen: UserInfoScreen },
    UserEditProfileScreen: { screen: UserEditProfileScreen },
    DeleteAccountMessageScreen: { screen: DeleteAccountMessageScreen },
    ChangePasswordScreen: { screen: ChangePasswordScreen },
    OTPScreen: { screen: OTPScreen },
    AddNewAddressScreen: { screen: AddNewAddressScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    AddPaymentMethodScreen: { screen: AddPaymentMethodScreen },
    AddCreditScreen: { screen: AddCreditScreen },
    CreateNewPasswordScreen: { screen: CreateNewPasswordScreen },
    AddBillingDetailsScreen: { screen: AddBillingDetailsScreen },
    EditBillingDetailsScreen: { screen: EditBillingDetailsScreen },
    OneClickPurchaseScreen: { screen: OneClickPurchaseScreen },
    SelectDeliveryAddressScreen: { screen: SelectDeliveryAddressScreen },
    SalamiCreditScreen: { screen: SalamiCreditScreen },
    UserCenter: { screen: UserCenter },
    NotificationsScreen: { screen: NotificationsScreen },
    SettingScreen: { screen: SettingScreen },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {},
  }
);

const AppContainer = createAppContainer(PrimaryNav);
export default class AppRouter extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
