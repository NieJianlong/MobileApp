import * as React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LaunchScreen from '../Containers/Launch'
import OnboardingScreen from '../Containers/Onboarding'

const PrimaryNav = createStackNavigator({
    LaunchScreen: { screen: LaunchScreen },
    OnboardingScreen: { screen: OnboardingScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {

    }
})

export default createAppContainer(PrimaryNav)