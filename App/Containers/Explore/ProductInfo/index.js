import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Images } from '../../../Themes'
import styles from './styles'

import {
    AppBar,
    SegmentedControl
} from '../../../Components'
import AppConfig from '../../../Config/AppConfig'

class ProductInfoScreen extends Component {

    componentDidMount() {

    }

    renderBody() {
        return (
            <View style={styles.body}>
                <SegmentedControl 
                    label1={'EXPLANATORY VIDEO'}
                    label2={'GEOGRAPHIC AREA'}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.container}
                    edges={['top', 'left', 'right']}>
                    <AppBar />

                    {this.renderBody()}

                </SafeAreaView>
            </View>
        )
    }
}

export default ProductInfoScreen