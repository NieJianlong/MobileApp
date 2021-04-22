import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'

import styles from './styles'

import {
    ProductSearchBox,
    AppBar,
    StarRating,
    TextInput,
} from '../../../Components'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'
import { s } from 'react-native-size-matters'

class RateOrderScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    componentDidMount() {

    }

    onPost = () => {
        this.props.route.params.onPost()
        NavigationService.goBack()
    }

    onPressGallery = () => {
        ImagePicker.openPicker({
            //cropping: true,
            includeBase64: true,
            multiple: true
        }).then(image => {
            let images = [...image, ...this.state.images]
            this.setState({ images })
        })
    }

    onPressCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
            includeBase64: true,
        }).then(image => {
            let images = [...image, ...this.state.images]
            this.setState({ images })
        })
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    removeImage = (index) => {
        let images = [...this.state.images]
        images.splice(index, 1)
        this.setState({ images })
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <AppBar
                    title={'Rate Order'}
                    rightButton={() =>
                        <TouchableOpacity onPress={this.onPost}>
                            <Text style={styles.txtSave}>POST</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }

    renderImageItem = ({ item, index }) => {
        return (
            <ImageBackground
                borderRadius={s(10)}
                source={{ uri: item.path }}
                style={styles.photoContainer}>
                <TouchableOpacity
                    onPress={() => this.removeImage(index)}
                    style={styles.btnDeleteContainer}>
                    <Image source={Images.crossMedium} style={styles.icDelete} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    renderBody() {
        return (
            <View style={styles.body}>
                <View style={styles.center}>
                    <Text style={styles.txtProductName}>iPhone 11</Text>
                    <StarRating ratingMode />
                </View>

                <TextInput
                    style={styles.reviewInput}
                    multiline
                    placeholder={'Write here your review'}
                    textAlignVertical={'top'}
                />

                <View style={styles.center}>
                    <Text style={styles.txt1}>Upload pictures to your review</Text>
                </View>

                <FlatList
                    ListHeaderComponent={() =>
                        <TouchableOpacity
                            onPress={() => this.showActionSheet()}
                            style={styles.btnAddPhotoContainer}>
                            <Image source={Images.add1} style={styles.icAdd} />
                        </TouchableOpacity>
                    }
                    horizontal
                    data={this.state.images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderImageItem}
                    showsHorizontalScrollIndicator={false}
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

                    {this.renderHeader()}

                    {this.renderBody()}

                </SafeAreaView>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Which one do you like ?'}
                    options={['Camera', 'Photo Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    //destructiveButtonIndex={1}
                    onPress={(index) => {
                        if (index === 0) {
                            this.onPressCamera()
                        } else if (index === 1) {
                            this.onPressGallery()
                        }
                    }}
                />
            </View>
        )
    }
}

export default RateOrderScreen