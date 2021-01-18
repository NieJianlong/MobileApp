import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import Collapsible from 'react-native-collapsible'

import {
    Switch,
    StarRating,
    Picker
} from '../../../Components'

import { Images, Colors } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'
import styles from './styles'
import NavigationService from '../../../Navigation/NavigationService'

import ProductItem from '../Components/ProductItem'

const { height } = Dimensions.get('window')

class ProductDetailScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showHeaderTabs: false,
            showDescription: false,
            tabIndex: 0,
        }
    }

    componentDidMount() {

    }

    handleScroll = (event) => {
        let threshold = height / 4
        let y = event.nativeEvent.contentOffset.y
        console.log(y)
        if (y > threshold && !this.state.showHeaderTabs) {
            this.setState({ showHeaderTabs: true })
        } else if (y <= threshold && this.state.showHeaderTabs) {
            this.setState({ showHeaderTabs: false })
        }
    }

    renderHeaderTabs() {
        return (
            <SafeAreaView style={styles.headerTabsSafeArea} edges={['top']}>
                <View style={styles.headerTabsContainer}>
                    {
                        tabs.map((i, index) =>
                            <TouchableOpacity
                                style={[styles.headerTabItem,
                                this.state.tabIndex === index && { borderBottomColor: Colors.primary }]}>
                                <Text
                                    style={[styles.heading5Bold,
                                    { color: this.state.tabIndex === index ? Colors.primary : Colors.grey60 }]}>
                                    {i}
                                </Text>
                            </TouchableOpacity>)
                    }
                </View>
            </SafeAreaView>
        )
    }

    renderProductImages() {
        return (
            <View style={styles.imagesContainer}>
                <Image
                    resizeMode={'contain'}
                    source={{ uri: product.picture }}
                    style={styles.prodImage}
                />

                <View style={styles.row1}>
                    <TouchableOpacity onPress={NavigationService.goBack} style={styles.btnRoundContainer}>
                        <Image style={styles.btnRoundIcon} source={Images.arrow_left} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnRoundContainer}>
                        <Image style={styles.btnRoundIcon} source={Images.cartMed} />
                    </TouchableOpacity>
                </View>

                <View style={styles.row2}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnRoundContainer}>
                            <Image style={styles.btnRoundIcon} source={Images.likeMed} />
                        </TouchableOpacity>
                        <View style={{ width: s(12) }} />
                        <TouchableOpacity style={styles.btnRoundContainer}>
                            <Image style={styles.btnRoundIcon} source={Images.share} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.photoNumberContainer}>
                        <Text style={styles.photoNumberTxt}>1/4</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderProductInfo() {
        return (
            <View style={styles.infoContainer}>
                <View style={styles.v2}>
                    <View>
                        <Text style={styles.heading2Bold}>{product.name}</Text>
                        <StarRating rating={product.rating} ratingCount={product.ratingCount} />
                    </View>
                    <View style={[styles.row, { marginTop: vs(8) }]}>
                        <View style={styles.v3}>
                            <Text style={[styles.heading6Bold, { color: Colors.grey60 }]}>RETAIL PRICE</Text>
                            <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text>
                        </View>

                        <View style={styles.v3}>
                            <Text style={[styles.heading6Bold, { color: Colors.black }]}>WHOLE SALE PRICE</Text>
                            <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text>
                        </View>

                        <View style={styles.percentOffContainer}>
                            <Text style={[styles.heading6Bold, { color: Colors.secondary00 }]}>30% OFF</Text>
                        </View>

                        <Text style={[styles.heading5Regular, { marginLeft: s(8) }]}>
                            Save ${product.retailPrice - product.wholesalePrice}
                        </Text>
                    </View>

                    <View style={[styles.row, { marginVertical: vs(10) }]}>
                        <Text style={styles.heading5Regular}>
                            Delivery fee: <Text style={{ color: Colors.primary }}>$14.90</Text>
                        </Text>

                        <View style={[styles.row, { marginLeft: s(10) }]}>
                            <Text style={[styles.heading5Regular, { marginRight: s(5) }]}>
                                Pick up from seller
                            </Text>
                            <Switch />
                        </View>
                    </View>
                </View>

                <View style={styles.v4}>
                    <View style={{ marginRight: s(10) }}>
                        <Text style={styles.heading6Regular}>Order closes on:</Text>
                        <Text style={styles.txtRegular}>{product.orderClose}</Text>
                    </View>

                    <View style={styles.row}>
                        <Image source={Images.stock} style={styles.icStock} />
                        <Text style={styles.txtOrderNumber}>{product.orderCount}/{product.inStock}</Text>
                        <TouchableOpacity>
                            <Image source={Images.info2} style={styles.icInfo} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => this.setState({ showDescription: !this.state.showDescription })}
                    style={styles.descriptionContainer}>
                    <Text style={styles.txtRegular}>
                        This is the product description vero eos et accusamus et iusto odio dignissimos ducimus
                        qui bl... <Text style={{ color: Colors.secondary00 }}>{this.state.showDescription ? 'Less' : 'Read more'}</Text>
                    </Text>

                    <Collapsible collapsed={!this.state.showDescription}>
                        <Text style={styles.txtRegular}>
                            This is the product description vero eos et accusamus et iusto odio dignissimos ducimus
                            qui blad
                        </Text>
                    </Collapsible>
                </TouchableOpacity>
            </View>
        )
    }

    renderOptions() {
        return (
            <View style={styles.optionContainer}>

                <View style={styles.noteContainer}>
                    <Text style={styles.heading6Regular}>
                        You have 7 days from receipt of the product to return it
                    </Text>
                </View>

                <Picker
                    style={styles.picker}
                    title={'Size'}
                    value={'256GB'}
                />

                <Picker
                    style={styles.picker}
                    title={'Style'}
                    value={'OnePlus 8 Pro'}
                />

                <Picker
                    style={styles.picker}
                    title={'Color'}
                    value={'Black'}
                />

            </View>
        )
    }

    renderRelatedProducts() {
        return (
            <View style={styles.relatedProductsContainer}>
                <View style={styles.relatedProductsHeader}>
                    <Text style={styles.heading3Bold}>Related products</Text>

                    <TouchableOpacity>
                        <Text
                            style={[styles.heading5Bold, { color: Colors.secondary00 }]}>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={styles.relatedProductsList}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={relatedProducs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <ProductItem product={item} size={'S'} />}
                    ItemSeparatorComponent={() => <View style={{ width: s(15) }} />}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.mainContainer}
                    edges={['top', 'left', 'right']}>
                    <ScrollView
                        onScroll={this.handleScroll}
                        scrollEventThrottle={60}
                        showsVerticalScrollIndicator={false}>

                        {this.renderProductImages()}

                        {this.renderProductInfo()}

                        {this.renderOptions()}

                        {this.renderRelatedProducts()}

                    </ScrollView>

                    {this.state.showHeaderTabs && this.renderHeaderTabs()}
                </SafeAreaView>
            </View>
        )
    }
}

export default ProductDetailScreen

const product = {
    name: 'iPhone 11',
    picture: 'https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24
}

const relatedProducs = [
    {
        name: 'iPhone 11',
        picture: 'https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png',
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
        picture: 'https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png',
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
        picture: 'https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
]

const tabs = ['Details', 'Related', 'Seller', 'Review']