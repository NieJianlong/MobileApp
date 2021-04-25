import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './styles'

import {
    AppBar,
    SegmentedControl
} from '../../../Components'

function ProductInfoScreen(props) {

    const renderBody = () => {
        return (
            <View style={styles.body}>
                <SegmentedControl
                    label1={'EXPLANATORY VIDEO'}
                    label2={'GEOGRAPHIC AREA'}
                    onSwitch={() => { }}
                />

                <Text style={styles.txtTitle}>
                    How our social purchasing system works
                </Text>

                <Text style={styles.txtContent}>
                    This is an explanatory text about how the social
                    ecommerce system works lorem ipsum simply dummy text
                    of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever.
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView
                style={styles.container}
                edges={['top', 'left', 'right']}>
                <AppBar />

                {renderBody()}

            </SafeAreaView>
        </View>
    )
}

export default ProductInfoScreen