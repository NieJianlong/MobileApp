import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors, Images } from '../../../Themes'
import styles from './styles'

import {
    AppBar
} from '../../../Components'
import AppConfig from '../../../Config/AppConfig'
import ImageViewer from 'react-native-image-zoom-viewer'

class ProductGalleryScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullscreenMode: this.props.navigation.state.params.fullscreenMode ?? false,
            currentImageIndex: 0
        }
    }

    componentDidMount() {

    }

    toggleFullscreenMode = (index) => {
        this.setState({ fullscreenMode: !this.state.fullscreenMode, currentImageIndex: index })
    }

    renderIndicator = (currentIndex, numberOfPhotos) => {
        return (
            <View style={styles.indicatorContainer}>
                <Text style={styles.indicator}>{currentIndex}/{numberOfPhotos}</Text>
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
                    <AppBar title={'Gallery (4)'} />

                    {
                        this.state.fullscreenMode ?
                            <ImageViewer
                                index={this.state.currentImageIndex}
                                imageUrls={imageUrls}
                                backgroundColor={Colors.background}
                                onClick={() => this.toggleFullscreenMode(0)}
                                renderIndicator={(currentIndex, allSize) => this.renderIndicator(currentIndex, imageUrls.length)}
                            /> :
                            <ScrollView contentContainerStyle={{ paddingHorizontal: AppConfig.paddingHorizontal }}>

                                {
                                    imageUrls.map((image, index) =>
                                        <TouchableOpacity onPress={() => this.toggleFullscreenMode(index)} >
                                            <Image
                                                resizeMode={'contain'}
                                                source={{ uri: image.url }}
                                                style={styles.image}
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </ScrollView>
                    }
                </SafeAreaView>
            </View>
        )
    }
}

export default ProductGalleryScreen

const imageUrls = [
    {
        url: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png'
    },
    {
        url: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png'
    },
    {
        url: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png'
    },
    {
        url: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png'
    },
]