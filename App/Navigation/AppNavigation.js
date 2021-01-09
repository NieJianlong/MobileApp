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
import NavigationService from './NavigationService';
import TabBar from './TabBar'

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
    LaunchScreen: { screen: LaunchScreen,headerMode: "node",navigationOptions:{headerShown:false} },
    MainScreen: { screen: TabNav },
    OnboardingScreen: { screen: OnboardingScreen,headerMode: "node",navigationOptions:{headerShown:false} },
    ExploreScreen: { screen: ExploreScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    LegalScreen: { screen: LegalScreen },
    UserInfoScreen: { screen: UserInfoScreen,headerMode: "screen",navigationOptions:{headerShown:true} },
    OTPScreen: { screen: OTPScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    CreateNewPasswordScreen: { screen: CreateNewPasswordScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
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