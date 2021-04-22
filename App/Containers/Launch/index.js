import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image
} from 'react-native'
import NavigationService from '../../Navigation/NavigationService'

import { Images } from '../../Themes'
import styles from './styles'

class LaunchScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
            //this.props.navigation.navigate('OnboardingScreen')
            NavigationService.navigate('OnboardingScreen')
        }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor={'rgba(0,0,0,0.0)'}
                />
                <Image
                    source={Images.logo2}
                    style={styles.logo}
                    resizeMode={'contain'}
                />
            </View>
        )
    }
}

export default LaunchScreen