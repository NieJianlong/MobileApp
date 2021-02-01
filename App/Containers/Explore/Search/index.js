import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './styles'

import {
    ProductSearchBox
} from '../../../Components'

class ProductSearchScreen extends Component {

    componentDidMount() {

    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <ProductSearchBox />
            </View>
        )
    }

    renderBody() {
        return (
            <View style={styles.body}>

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

                    {this.renderHeader()}

                    {this.renderBody()}

                </SafeAreaView>
            </View>
        )
    }
}

export default ProductSearchScreen