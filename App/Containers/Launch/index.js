import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image
} from 'react-native'

import { Images } from '../../Themes'
import styles from './styles'

class LaunchScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('OnboardingScreen')
        }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
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