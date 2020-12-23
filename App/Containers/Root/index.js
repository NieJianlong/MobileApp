import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import AppNavigation from '../../Navigation/AppNavigation'

class RootContainer extends Component {

    componentDidMount () {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <AppNavigation />
            </View>
        )
    }
}

export default RootContainer