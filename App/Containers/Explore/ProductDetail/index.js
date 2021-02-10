import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList,
    ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import Animated from 'react-native-reanimated'
import Collapsible from 'react-native-collapsible'
import Carousel from 'react-native-snap-carousel'
import InView from 'react-native-component-inview'
import { ScrollIntoView, wrapScrollView } from 'react-native-scroll-into-view'
import moment from 'moment'
import { range } from 'lodash'

import {
    Switch,
    StarRating,
    Picker,
    QuantitySelector,
    DescriptionText,
    Button,
    Progress,
    BottomSheet,
    BottomSheetBackground,
    Alert,
} from '../../../Components'

import { Images, Colors } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'
import styles from './styles'
import NavigationService from '../../../Navigation/NavigationService'

import ProductItem from '../Components/ProductItem'
import Review from '../Components/Review'
import ColorOptionItem from '../Components/ColorOptionItem'

const { height } = Dimensions.get('window')
const Sections = range(0, 4)
const sliderWidth = Dimensions.get('window').width
const carouselItemWidth = Dimensions.get('window').width
// Wrap the original ScrollView
const CustomScrollView = wrapScrollView(ScrollView)

class ProductDetailScreen extends Component {

    fall = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.state = {
            showHeaderTabs: false,
            showFooter: false,
            showDescription: false,

            tabIndex: 0,
            photoIndex: 0,
            quantity: 1,
            totalPrice: 0,
            colorIndex: 0,
            isPurchased: true,

            showPickupFromSellerSheet: false,
            showColorSheet: false,
            showAddToCartSheet: false,

            showReviewSentAlert: false,
            showReportSentAlert: false,
        }
    }

    componentDidMount() {

    }

    toggleReviewSentAlert = () => {
        if (this.state.showReviewSentAlert) {
            setTimeout(() => {
                this.setState({ showReviewSentAlert: false })
            }, 2100)
        } else {
            this.setState({ showReviewSentAlert: true })
        }
    }

    toggleReportSentAlert = () => {
        if (this.state.showReportSentAlert) {
            setTimeout(() => {
                this.setState({ showReportSentAlert: false })
            }, 2100)
        } else {
            this.setState({ showReportSentAlert: true })
        }
    }

    sectionsRefs = Sections.map(_section => React.createRef())

    scrollSectionIntoView = (section) => {
        this.sectionsRefs[section].current.scrollIntoView(
            {
                align: 'top',
                insets: {
                    top: vs(35),
                    bottom: 0,
                }
            }
        )
    }

    setTabIndex = (index) => this.setState({ tabIndex: index })

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

    togglePickupFromSellerSheet = () => {
        this.setState({ showPickupFromSellerSheet: !this.state.showPickupFromSellerSheet }, () => {
            if (this.state.showPickupFromSellerSheet) {
                this.pickupFromSellerSheet.snapTo(0)
            } else {
                this.pickupFromSellerSheet.snapTo(1)
            }
        })
    }

    toggleColorSheet = () => {
        this.setState({ showColorSheet: !this.state.showColorSheet }, () => {
            if (this.state.showColorSheet) {
                this.colorSheet.snapTo(0)
            } else {
                this.colorSheet.snapTo(1)
            }
        })
    }

    toggleAddToCartSheet = () => {
        this.setState({ showAddToCartSheet: !this.state.showAddToCartSheet }, () => {
            if (this.state.showAddToCartSheet) {
                this.addToCartSheet.snapTo(0)
            } else {
                this.addToCartSheet.snapTo(1)
            }
        })
    }

    renderReviewSentAlert() {
        return (
            <Alert
                visible={this.state.showReviewSentAlert}
                title={'Thanks for your review!'}
                message={'Your review has been added successfully'}
                color={Colors.success}
                onDismiss={this.toggleReviewSentAlert}
            />
        )
    }

    renderReportSentAlert() {
        return (
            <Alert
                visible={this.state.showReportSentAlert}
                title={'Thanks for your report!'}
                message={'Your report has been sent successfully'}
                color={Colors.success}
                onDismiss={this.toggleReviewSentAlert}
            />
        )
    }

    renderHeaderTabs() {
        return (
            <SafeAreaView style={styles.headerTabsSafeArea} edges={['top']}>
                <View style={styles.headerTabsContainer}>
                    {
                        tabs.map((i, index) =>
                            <TouchableOpacity
                                key={index.toString()}
                                onPress={() => {
                                    this.setState({ tabIndex: index })
                                    this.scrollSectionIntoView(index)
                                }}
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
                    <TouchableOpacity style={styles.row} onPress={this.toggleAddToCartSheet}>
                        <Image source={Images.cartMed} style={styles.icCart} />
                        <Text style={[styles.txtBold, { color: Colors.primary }]}>ADD TO CART</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => NavigationService.navigate('OrderPlacedScreen')}
                        style={styles.btnBuyNow}>
                        <Text style={[styles.txtBold, { color: Colors.white }]}>BUY NOW</Text>

                        <View style={styles.priceContainer}>
                            <Text style={[styles.txtRegular, { color: Colors.white }]}>{this.state.quantity * product.wholesalePrice}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    _renderImageItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => NavigationService.navigate('ProductGalleryScreen', { fullscreenMode: true })}>
                <Image
                    resizeMode={'contain'}
                    source={{ uri: product.picture }}
                    style={styles.prodImage}
                />
            </TouchableOpacity>
        )
    }

    onSnapToItem = (index) => {
        this.setState({ photoIndex: index })
    }

    renderProductImages() {
        return (
            <View style={styles.imagesContainer}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={product.photoUrls}
                    renderItem={this._renderImageItem}
                    sliderWidth={sliderWidth}
                    itemWidth={carouselItemWidth}
                    onSnapToItem={this.onSnapToItem}
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

                    <TouchableOpacity
                        onPress={() => NavigationService.navigate('ProductGalleryScreen', { fullscreenMode: false })}
                        style={styles.photoNumberContainer}>
                        <Text style={styles.photoNumberTxt}>{this.state.photoIndex + 1}/{product.photoUrls.length}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderProductInfo() {
        return (
            <InView
                onChange={(isVisible) => {
                    if (isVisible) {
                        this.setState({ tabIndex: 0 })
                    }
                }}>
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
                                <Switch
                                    onSwitch={(t) => {
                                        if (t) {
                                            this.togglePickupFromSellerSheet()
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.v4}>
                        <View style={{ marginRight: s(10) }}>
                            <Text style={styles.heading6Regular}>Order closes on:</Text>
                            <Text style={styles.txtRegular}>{product.orderClose}</Text>
                        </View>

                        <View style={styles.row}>
                            <Progress
                                currentValue={24}
                                maximumValue={100}
                                style={{ marginHorizontal: s(10) }}
                            />

                            <Image source={Images.stock} style={styles.icStock} />
                            <Text style={styles.txtOrderNumber}>{product.orderCount}/{product.inStock}</Text>
                            <TouchableOpacity onPress={() => NavigationService.navigate('ProductInfoScreen')}>
                                <Image source={Images.info2} style={styles.icInfo} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.v2, { paddingTop: vs(15) }]}>
                        <Text style={styles.heading3Bold}>Product Description</Text>
                        <DescriptionText
                            style={styles.descriptionContainer}
                            text={'This is the product description vero eos et accusamus et iusto odio dignissimos ducimus' +
                                'qui blad. This is the product description vero eos et accusamus et iusto odio dignissimos ducimus' +
                                'qui blad'}
                        />
                    </View>

                    <View style={[styles.v2, { paddingTop: vs(15) }]}>
                        <Text style={styles.heading3Bold}>Details & Highlights</Text>
                        <View style={styles.row}>
                            <Text style={styles.txtDot}>•</Text>
                            <Text style={styles.txtRegular}>
                                Vero eos et accusamus et iusto odio dignissimos
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.txtDot}>•</Text>
                            <Text style={styles.txtRegular}>
                                Vero eos et accusamus et iusto odio dignissimos
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.txtDot}>•</Text>
                            <Text style={styles.txtRegular}>
                                Vero eos et accusamus et iusto odio dignissimos
                            </Text>
                        </View>
                    </View>
                </View>
            </InView>
        )
    }

    renderChatOptions() {
        return (
            <View style={styles.chatContainer}>
                <View style={styles.chatIconsContainer}>
                    <TouchableOpacity style={[styles.chatButton, { backgroundColor: Colors.facebook }]}>
                        <Image source={Images.facebook} style={styles.chatIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.chatButton, { backgroundColor: Colors.whatsapp }]}>
                        <Image source={Images.whatsapp} style={styles.chatIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.chatButton, { backgroundColor: Colors.google }]}>
                        <Image source={Images.google} style={styles.chatIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.chatButton, { backgroundColor: Colors.twitter }]}>
                        <Image source={Images.twitter} style={styles.chatIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.chatButton, { backgroundColor: Colors.grey10 }]}>
                        <Image source={Images.add1} style={styles.icAdd} />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.txtBold, { marginTop: vs(20), marginBottom: vs(15) }]}>
                    You can chat here with seller and co-buyers:
                </Text>

                <View style={{ width: '100%' }}>
                    <Button
                        backgroundColor={Colors.grey80}
                        text={'CHAT'} />
                </View>
            </View>
        )
    }

    renderOptions() {
        return (
            <View style={styles.optionContainer}>

                <View style={styles.noteContainer}>
                    <Text style={styles.heading6Regular}>
                        Covered by Seller Name 7 day return policy, for:
                    </Text>

                    <View style={[styles.rowSpaceBetween, { marginTop: vs(15) }]}>
                        <Image resizeMode={'contain'} style={styles.returnPolicyImage} source={Images.returnPolicy3} />
                        <Image resizeMode={'contain'} style={styles.returnPolicyImage} source={Images.returnPolicy2} />
                        <Image resizeMode={'contain'} style={styles.returnPolicyImage} source={Images.returnPolicy1} />
                    </View>
                </View>

                {this.state.isPurchased && this.renderChatOptions()}

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
                    onPress={this.toggleColorSheet}
                    style={styles.picker}
                    title={'Color'}
                    value={'Black'}
                />

            </View>
        )
    }

    renderRelatedProducts() {
        return (
            <InView
                onChange={(isVisible) => {
                    if (isVisible) {
                        //this.setState({ tabIndex: 1 })
                    }
                }}>
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
            </InView>
        )
    }

    renderStoreInfo() {
        return (
            <InView
                onChange={(isVisible) => {
                    if (isVisible) {
                        //this.setState({ tabIndex: 2 })
                    }
                }}>
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
            </InView>
        )
    }

    renderUserReview() {
        return (
            <TouchableOpacity
                onPress={() => NavigationService.navigate('RateOrderScreen', { onPost: this.toggleReviewSentAlert })}
                style={styles.userReviewContainer}>
                <Text style={styles.heading4Bold}>Rate and review this product</Text>
                <Text style={styles.txtRegular}>Share your experience</Text>

                <View style={{ height: vs(20) }} />

                <StarRating ratingMode />
            </TouchableOpacity>
        )
    }

    renderProductReview() {
        return (
            <View style={styles.productReviewContainer}>

                <InView onChange={(isVisible) => {
                    if (isVisible) {
                        //this.setState({ tabIndex: 3 })
                    }
                }}>
                    <Text style={styles.heading3Bold}>Product Reviews</Text>

                    <Review
                        rating={product.rating}
                        ratingCount={product.ratingCount}
                        ratingDetail={product.ratingDetail} />
                </InView>

                <View style={{ height: vs(15) }} />

                {this.state.isPurchased && this.renderUserReview()}

                <View style={{ height: vs(15) }} />

                {
                    comments.map((comment, index) =>
                        <View key={index.toString()} style={styles.commentContainer}>
                            <View style={[styles.row, { marginBottom: vs(5) }]}>
                                <View style={styles.sellerAvatarContainer}>
                                    <Image source={{ uri: comment.user.avatar }} style={styles.sellerAvatar} />
                                </View>
                                <Text style={styles.heading5Bold}>{comment.user.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <StarRating rating={comment.comment.rating} />
                                <Text style={styles.heading6Regular}>{moment(comment.comment.createdDate).fromNow()}</Text>
                            </View>

                            <Text style={[styles.heading5Bold, { marginTop: vs(5) }]}>{comment.comment.title}</Text>

                            <DescriptionText
                                previewLength={150}
                                text={'At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium' +
                                    'voluptatum deleniti atque corrupti quos dolores et quas mol' + 'At vero eoset accusamus et iusto' +
                                    'odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol'
                                }
                            />

                            {
                                comment.comment.photos.length > 0 &&
                                <View style={{ marginTop: vs(10) }}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={comment.comment.photos}
                                        renderItem={({ item, index }) =>
                                            <ImageBackground
                                                key={index.toString()}
                                                borderRadius={5}
                                                source={{ uri: item }}
                                                style={styles.commentPhoto}
                                            />
                                        }
                                    />
                                </View>

                            }

                            <View style={[styles.row, { marginTop: vs(15) }]}>
                                <TouchableOpacity style={styles.btnGrey}>
                                    <Text style={[styles.heading5Bold, { color: Colors.white }]}>
                                        HELPFUL ({comment.comment.like})
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate('ReportScreen', { onSubmit: this.toggleReportSentAlert })}
                                    style={{ marginLeft: s(20) }}>
                                    <Text style={[styles.heading5Bold, { color: Colors.grey60 }]}>
                                        REPORT
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {
                                comment.comment.reply.length > 0 &&
                                <View style={{ marginLeft: s(15), marginTop: vs(20) }}>
                                    {
                                        comment.comment.reply.map((item, index) =>
                                            <View key={index.toString()}>
                                                <View style={[styles.row, { marginBottom: vs(5) }]}>
                                                    <View style={styles.sellerAvatarContainer}>
                                                        <Image source={{ uri: item.user.avatar }} style={styles.sellerAvatar} />
                                                    </View>
                                                    <Text style={styles.heading5Bold}>{item.user.name}</Text>
                                                </View>

                                                <DescriptionText
                                                    previewLength={150}
                                                    text={'At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium' +
                                                        'voluptatum deleniti atque corrupti quos dolores et quas mol' + 'At vero eoset accusamus et iusto' +
                                                        'odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol'
                                                    }
                                                />

                                                <View style={[styles.row, { marginTop: vs(15) }]}>
                                                    <TouchableOpacity style={styles.btnGrey}>
                                                        <Text style={[styles.heading5Bold, { color: Colors.white }]}>
                                                            HELPFUL ({comment.comment.like})
                                                </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={{ marginLeft: s(20) }}>
                                                        <Text style={[styles.heading5Bold, { color: Colors.grey60 }]}>
                                                            REPORT
                                                </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            }

                        </View>
                    )
                }
            </View>
        )
    }

    renderSectionDetails() {
        return (
            <ScrollIntoView
                align={'top'}
                key={'section0'}
                ref={this.sectionsRefs[0]}
            >
                {this.renderProductImages()}

                {this.renderProductInfo()}

                {this.renderOptions()}
            </ScrollIntoView>
        )
    }

    renderSectionRelated() {
        return (
            <ScrollIntoView
                key={'section1'}
                ref={this.sectionsRefs[1]}
            >
                {this.renderRelatedProducts()}
            </ScrollIntoView>
        )
    }

    renderSectionSeller() {
        return (
            <ScrollIntoView
                key={'section2'}
                ref={this.sectionsRefs[2]}
            >
                {this.renderStoreInfo()}
            </ScrollIntoView>
        )
    }

    renderSectionReview() {
        return (
            <ScrollIntoView
                key={'section3'}
                ref={this.sectionsRefs[3]}
            >
                {this.renderProductReview()}
            </ScrollIntoView>
        )
    }

    renderPickupFromSellerSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.pickupFromSellerSheet = ref
                }}
                onCloseEnd={() => this.setState({ showPickupFromSellerSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(290), 0]}
                initialSnap={this.state.showPickupFromSellerSheet ? 0 : 1}
                title={'Pick up from seller'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={[styles.txtRegular, { textAlign: 'center' }]}>
                        This is the seller's address where you have to{'\n'}go to pick up your order
                    </Text>

                    <View style={styles.pickupLocationContainer}>
                        <Image style={styles.pickupLocationIcon} source={Images.locationMed} />

                        <View style={{ marginLeft: s(10) }}>
                            <Text style={styles.heading5Bold}>Seller Address 00</Text>
                            <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
                        </View>
                    </View>

                    <Button onPress={this.togglePickupFromSellerSheet} text={'OK'} />
                </View>
            </BottomSheet>
        )
    }

    renderColorSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.colorSheet = ref
                }}
                onCloseEnd={() => this.setState({ showColorSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(390), 0]}
                initialSnap={this.state.showColorSheet ? 0 : 1}
                title={'Color'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {
                        product.colors.map((item, index) =>
                            <ColorOptionItem
                                defaultValue={this.state.colorIndex === index}
                                onSwitch={() => { this.setState({ colorIndex: index }) }}
                                label={item.name}
                                style={{ marginBottom: vs(16) }}
                                available={item.available}
                            />
                        )
                    }
                </View>
            </BottomSheet>
        )
    }

    renderAddToCartSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addToCartSheet = ref
                }}
                onCloseEnd={() => this.setState({ showAddToCartSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(290), 0]}
                initialSnap={this.state.showAddToCartSheet ? 0 : 1}
                title={'An item has been added to your cart'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={[styles.txtRegular, { textAlign: 'center', marginBottom: vs(25) }]}>
                        There are now 2 items in your cart
                    </Text>

                    <Button onPress={this.toggleAddToCartSheet} text={'GO TO CHECKOUT'} />

                    <View style={styles.btnRow}>
                        <View style={styles.v5}>
                            <Button
                                onPress={this.toggleAddToCartSheet}
                                text={'CONTINUE'}
                                backgroundColor={Colors.grey80}
                            />
                        </View>

                        <View style={styles.v5}>
                            <Button
                                text={'VIEW CART'}
                                backgroundColor={Colors.grey80}
                            />
                        </View>

                    </View>
                </View>
            </BottomSheet>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.mainContainer}
                    edges={['top', 'left', 'right']}>
                    <CustomScrollView
                        contentContainerStyle={{ paddingBottom: vs(150) }}
                        onScroll={this.handleScroll}
                        onMomentumScrollEnd={this.handleScrollEnd}
                        scrollEventThrottle={60}
                        showsVerticalScrollIndicator={false}>

                        {this.renderSectionDetails()}

                        {this.renderSectionRelated()}

                        {this.renderSectionSeller()}

                        {this.renderSectionReview()}
                    </CustomScrollView>

                    {this.state.showHeaderTabs && this.renderHeaderTabs()}

                    {this.state.showFooter && this.renderFooter()}
                </SafeAreaView>

                {/* background for bottom sheet */}
                <BottomSheetBackground
                    visible={this.state.showPickupFromSellerSheet ||
                        this.state.showColorSheet ||
                        this.state.showAddToCartSheet
                    }
                    controller={this.fall}
                />

                {this.renderPickupFromSellerSheet()}

                {this.renderColorSheet()}

                {this.renderAddToCartSheet()}

                {this.renderReviewSentAlert()}

                {this.renderReportSentAlert()}
            </View>
        )
    }
}

export default ProductDetailScreen

const product = {
    name: 'iPhone 11',
    picture: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
    photoUrls: [
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
    ],
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
    },
    colors: [
        { name: 'Onyx Black', available: true },
        { name: 'Glaciar Green', available: true },
        { name: 'Interstella Glow', available: true },
        { name: 'Blue', available: false }
    ]
}

const relatedProducs = [
    {
        name: 'iPhone 11',
        picture: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
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
        picture: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
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
        picture: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        rating: 3.0,
        ratingCount: 124,
        retailPrice: 2345,
        wholesalePrice: 1542,
        orderClose: '22/12/2020',
        inStock: 100,
        orderCount: 24
    },
]

const comments = [
    {
        user: {
            name: 'Asley',
            avatar: 'https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png'
        },
        comment: {
            title: 'Absolutely love it!',
            content: 'At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.',
            createdDate: '2019-09-12',
            rating: 4.5,
            photos: [],
            like: 123,
            reply: []
        }
    },
    {
        user: {
            name: 'Brian',
            avatar: 'https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png'
        },
        comment: {
            title: 'Absolutely love it!',
            content: 'At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.',
            createdDate: '2020-12-12',
            rating: 4.5,
            like: 13,
            photos: [
                'https://www.europeanceo.com/wp-content/uploads/2019/09/Private-islands.jpg',
                'https://cdn.britannica.com/15/162615-131-0CBB2CBE/island-Caribbean.jpg',
                'https://thumbor.thedailymeal.com/ZZtexrWGOq6hJ7jOzleSrg9P_1Q=/870x565/https://www.theactivetimes.com/sites/default/files/2019/07/15/shutterstock_526092568.jpg',
                'https://a0.muscache.com/im/pictures/3d554f6c-6efa-422a-a5d6-6c442abe81a4.jpg?aki_policy=x_large',
            ],
            reply: [{
                user: {
                    name: 'Apple',
                    avatar: 'https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png'
                },
                comment: {
                    title: '',
                    content: 'At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas mol.',
                    createdDate: '2020-18-1',
                    like: 3
                }
            }]
        }
    }
]

const tabs = ['Details', 'Related', 'Seller', 'Review']