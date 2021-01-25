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
    AppBar
} from '../../../Components'
import AppConfig from '../../../Config/AppConfig'

class ProductGalleryScreen extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.container}
                    edges={['top', 'left', 'right']}>
                    <AppBar title={'Gallery (4)'} />

                    <ScrollView contentContainerStyle={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
                        <Image
                            resizeMode={'contain'}
                            source={{ uri: imageSource }}
                            style={styles.image}
                        />

                        <Image
                            resizeMode={'contain'}
                            source={{ uri: imageSource }}
                            style={styles.image}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

export default ProductGalleryScreen

const imageSource = 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png'