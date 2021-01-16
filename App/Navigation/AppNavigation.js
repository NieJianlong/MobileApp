import * as React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import LaunchScreen from '../Containers/Launch'
import OnboardingScreen from '../Containers/Onboarding'
import ExploreScreen from '../Containers/Explore'
import LoginScreen from '../Containers/Login'
import RegisterScreen from '../Containers/Register'
import LegalScreen from '../Containers/Legal'
import OTPScreen from '../Containers/OTP'
import ForgotPasswordScreen from '../Containers/ForgotPassword'
import CreateNewPasswordScreen from '../Containers/CreateNewPassword'
import UserCenter from '../Containers/UserCenter'
import UserInfoScreen from '../Containers/UserInfo'
import UserEditProfileScreen from '../Containers/UserEditProfile'
import DeleteAccountMessageScreen from '../Containers/DeleteAccountMessage'
import AddNewAddressScreen from '../Containers/AddNewAddress';
import NavigationService from './NavigationService';
import ChangePasswordScreen from '../Containers/ChangePassword';
import AddPaymentMethodScreen from '../Containers/AddPaymentMethod';
import TabBar from './TabBar';


const TabNav = createBottomTabNavigator({
    ExploreScreen: { screen: ExploreScreen },
    PackageScreen: { screen: ExploreScreen },
    CartScreen: { screen: ExploreScreen },
    FollowScreen: { screen: ExploreScreen },
    MenuScreen: { screen: UserCenter }
}, {
    tabBarComponent: (props) => (
        <TabBar {...props} />
    )
})

const PrimaryNav = createStackNavigator({
    LaunchScreen: { screen: LaunchScreen },
    MainScreen: { screen: TabNav },
    OnboardingScreen: { screen: OnboardingScreen },
    ExploreScreen: { screen: ExploreScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    LegalScreen: { screen: LegalScreen },
    UserInfoScreen: { screen: UserInfoScreen},
    UserEditProfileScreen:{ screen: UserEditProfileScreen},
    DeleteAccountMessageScreen:{ screen:DeleteAccountMessageScreen},
    ChangePasswordScreen:{screen:ChangePasswordScreen},
    OTPScreen: { screen: OTPScreen },
    AddNewAddressScreen:{ screen:AddNewAddressScreen},
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    AddPaymentMethodScreen: {screen: AddPaymentMethodScreen},
    CreateNewPasswordScreen: { screen: CreateNewPasswordScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'UserInfoScreen',
    navigationOptions: {

    }
})


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