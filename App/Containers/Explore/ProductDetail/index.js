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
    Picker,
    QuantitySelector,
    DescriptionText
} from '../../../Components'
import { currencyFormatter } from '../../../Utils/Currency'

import { Images, Colors } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'
import styles from './styles'
import NavigationService from '../../../Navigation/NavigationService'

import ProductItem from '../Components/ProductItem'
import Review from '../Components/Review'

const { height } = Dimensions.get('window')

class ProductDetailScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showHeaderTabs: false,
            showFooter: false,
            showDescription: false,
            tabIndex: 0,
            quantity: 1,
            totalPrice: 0,
        }
    }

    componentDidMount() {

    }

    handleScroll = (event) => {
        let threshold = height / 4
        let y = event.nativeEvent.contentOffset.y
        if (y > threshold && !this.state.showHeaderTabs) {
            this.setState({ showHeaderTabs: true, showFooter: false })
        } else if (y <= threshold && this.state.showHeaderTabs) {
            this.setState({ showHeaderTabs: false, showFooter: false })
        }
    }

    handleScrollEnd = (event) => {
        this.setState({ showFooter: true })
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

    renderFooter() {
        return (
            <SafeAreaView style={styles.footerSafeArea} edges={['bottom']}>
                <QuantitySelector
                    minimumValue={1}
                    maximumValue={100}
                    value={this.state.quantity}
                    onChange={(value) => this.setState({ quantity: value })}
                />

                <View style={{ height: vs(15) }} />

                <View style={styles.rowSpaceBetween}>
                    <TouchableOpacity style={styles.row}>
                        <Image source={Images.cartMed} style={styles.icCart} />
                        <Text style={[styles.txtBold, { color: Colors.primary }]}>ADD TO CART</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnBuyNow}>
                        <Text style={[styles.txtBold, { color: Colors.white }]}>BUY NOW</Text>

                        <View style={styles.priceContainer}>
                            <Text style={[styles.txtRegular, { color: Colors.white }]}>{currencyFormatter.format(this.state.quantity * product.wholesalePrice)}</Text>
                        </View>
                    </TouchableOpacity>
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

                <DescriptionText
                    style={styles.descriptionContainer}
                    text={'This is the product description vero eos et accusamus et iusto odio dignissimos ducimus' +
                        'qui blad. This is the product description vero eos et accusamus et iusto odio dignissimos ducimus' +
                        'qui blad'}
                />
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

    renderStoreInfo() {
        return (
            <View style={styles.storeInfoContainer}>
                <View style={styles.rowSpaceBetween}>
                    <View style={styles.row}>
                        <View style={styles.sellerAvatarContainer}>
                            <Image source={{ uri: product.seller.avatar }} style={styles.sellerAvatar} />
                        </View>
                        <Text style={styles.heading5Bold}>{product.seller.name}</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={[styles.heading5Bold, { color: Colors.secondary00 }]}>VISIT STORE</Text>
                    </TouchableOpacity>
                </View>

                <StarRating 
                    fullMode
                    style={{ marginTop: vs(10) }}
                    rating={product.seller.rating} 
                    ratingCount={product.seller.ratingCount} />

                <DescriptionText
                    style={{ marginTop: vs(10) }}
                    text={product.seller.description}
                />
            </View>
        )
    }

    renderProductReview() {
        return (
            <View style={styles.productReviewContainer}>
                <Text style={styles.heading3Bold}>Product Reviews</Text>

                <Review 
                    rating={product.rating}
                    ratingCount={product.ratingCount}
                    ratingDetail={product.ratingDetail} />
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
                        contentContainerStyle={{ paddingBottom: vs(120) }}
                        onScroll={this.handleScroll}
                        onMomentumScrollEnd={this.handleScrollEnd}
                        scrollEventThrottle={60}
                        showsVerticalScrollIndicator={false}>

                        {this.renderProductImages()}

                        {this.renderProductInfo()}

                        {this.renderOptions()}

                        {this.renderRelatedProducts()}

                        {this.renderStoreInfo()}

                        {this.renderProductReview()}

                    </ScrollView>

                    {this.state.showHeaderTabs && this.renderHeaderTabs()}

                    {this.state.showFooter && this.renderFooter()}
                </SafeAreaView>
            </View>
        )
    }
}

export default ProductDetailScreen

const product = {
    name: 'iPhone 11',
    picture: 'https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png',
    rating: 3.5,
    ratingCount: 624,
    ratingDetail: {
        oneStar: 41,
        twoStar: 150,
        threeStar: 50,
        fourStar: 74,
        fiveStar: 309,
    },
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24,
    seller: {
        avatar: 'https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png',
        name: 'thegioididong',
        description: 'Thegioididong.com là thương hiệu thuộc Công ty Cổ phần Thế giới di động, Tên tiếng Anh là Mobile World JSC, (mã Chứng Khoán: MWG) là một tập đoàn bán lẻ tại Việt Nam với lĩnh vực kinh doanh chính là bán lẻ điện thoại di động, thiết bị số và điện tử tiêu dùng[2]. Theo nghiên cứu của EMPEA, thống kê thị phần bán lẻ điện thoại di động tại Việt Nam năm 2014 thì Thế giới di động hiện chiếm 25% và là doanh nghiệp lớn nhất trong lĩnh vực của mình.',
        rating: 4.2,
        ratingCount: 1024,  
    }
}

const relatedProducs = [
    {
        name: 'iPhone 11',
        picture: 'https://www.pngmart.com/files/13/iPhone-12-PNG-HD.png',
        rating: 3.5,
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