import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './styles'

import {
    AppBar
} from '../../../Components'
import ProductInfo from '../Components/ProductInfo'
import ProductItem from '../../Explore/Components/ProductItem'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'
import images from '../../../Themes/Images'
import { s } from 'react-native-size-matters'

class GroupInfoScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <AppBar
                    title={'Group Info'}
                />
            </View>
        )
    }

    renderAction = (icon, text, action) => {
        return (
            <TouchableOpacity onPress={action} style={styles.actionContainer}>
                <View style={styles.row}>
                    <Image resizeMode={'contain'} source={icon} style={styles.actionIcon} />

                    <Text style={styles.heading5Bold}>{text}</Text>
                </View>

                <Image source={Images.arrow_left} style={styles.icArrow} />
            </TouchableOpacity>
        )
    }

    renderActions() {
        return (
            <View>
                {this.renderAction(Images.packageMed, 'Order details', () => NavigationService.navigate('OrderDetailScreen'))}
                {this.renderAction(Images.invoice, 'Invoice', () => NavigationService.navigate('InvoiceScreen'))}
                {this.renderAction(Images.star, 'Write a review about the product')}
                {this.renderAction(Images.user, 'Evaluate the seller')}
            </View>
        )
    }

    renderMediaItem = ({ item, index }) => {
        return (
            <ImageBackground
                borderRadius={s(5)}
                source={{ uri: item.url }}
                style={styles.mediaItemContainer}>

            </ImageBackground>
        )
    }

    renderMediaSection() {
        return (
            <View>
                <Text style={styles.sectionName}>Media, Links and Docs</Text>

                <FlatList
                    data={media}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderMediaItem}
                    contentContainerStyle={{ paddingHorizontal: s(15) }}
                />
            </View>
        )
    }

    renderRelatedProducts() {
        return (
            <View>
                <Text style={styles.sectionName}>Who bought this items also bought below items:</Text>

                {
                    products.map((item, index) => <ProductItem size={'M'} product={item} />)
                }
            </View>
        )
    }

    renderBody() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
                <ProductInfo product={product} />

                {this.renderActions()}

                {this.renderMediaSection()}

                {this.renderRelatedProducts()}
            </ScrollView>
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

export default GroupInfoScreen

const product = {
    name: 'iPhone 11',
    picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24
}

const media = [
    {
        type: 'image',
        url: 'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg'
    },
    {
        type: 'image',
        url: 'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg'
    },
    {
        type: 'image',
        url: 'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg'
    },
    {
        type: 'image',
        url: 'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg'
    },
    {
        type: 'image',
        url: 'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg'
    },
]

const products = [
    {
        name: 'iPhone 11',
        picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
    {
        name: 'iPhone 11',
        picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
        rating: 4.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
    {
        name: 'iPhone 11',
        picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
    {
        name: 'iPhone 11',
        picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
    {
        name: 'iPhone 11',
        picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
    {
        name: 'iPhone 11',
        picture: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    }
]