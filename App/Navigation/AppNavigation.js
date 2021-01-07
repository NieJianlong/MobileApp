/*
 * @Author: your name
 * @Date: 2021-01-06 22:25:12
 * @LastEditTime: 2021-01-07 18:55:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Navigation/AppNavigation.js
 */
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
    LaunchScreen: { screen: LaunchScreen },
    MainScreen: { screen: TabNav },
    OnboardingScreen: { screen: OnboardingScreen },
    ExploreScreen: { screen: ExploreScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    LegalScreen: { screen: LegalScreen },
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

export default createAppContainer(PrimaryNav)