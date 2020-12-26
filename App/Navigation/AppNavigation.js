import * as React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LaunchScreen from '../Containers/Launch'
import OnboardingScreen from '../Containers/Onboarding'
import ExploreScreen from '../Containers/Explore'
import LoginScreen from '../Containers/Login'
import RegisterScreen from '../Containers/Register'

const PrimaryNav = createStackNavigator({
    LaunchScreen: { screen: LaunchScreen },
    OnboardingScreen: { screen: OnboardingScreen },
    ExploreScreen: { screen: ExploreScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {

    }
})

export default createAppContainer(PrimaryNav)