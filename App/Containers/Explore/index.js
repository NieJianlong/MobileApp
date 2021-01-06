import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native'
import { vs, s } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'

import {
    Button,
    BottomSheet,
    LocationSearchBox,
    TextInput,
    Alert,
    RadiusButton,
    StarRating
} from '../../Components'

import { Colors, Images } from '../../Themes'
import styles from './styles'
import AppConfig from '../../Config/AppConfig'

class ExploreScreen extends Component {

    fall = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.state = {
            showLocationSheet: false,
            showAddLocationSheet: false,
            showAddAddressSheet: false,
            showAccountActivatedSuccessfullyAlert: false,
            showAccountActivateAlert: false,

            selectedCategory: 0,
            showProductAsRows: true
        }
    }

    componentDidMount() {

    }

    toggleAddressSheet = () => {
        this.setState({ showLocationSheet: !this.state.showLocationSheet }, () => {
            if (this.state.showLocationSheet) {
                this.addressSheet.snapTo(0)
            } else {
                this.addressSheet.snapTo(1)
            }
        })
    }

    toggleAddLocationSheet = () => {
        this.setState({ showAddLocationSheet: !this.state.showAddLocationSheet }, () => {
            if (this.state.showAddLocationSheet) {
                this.addLocationSheet.snapTo(0)
            } else {
                this.addLocationSheet.snapTo(1)
            }
        })
    }

    toggleAddAddressSheet = () => {
        this.setState({ showAddAddressSheet: !this.state.showAddAddressSheet }, () => {
            if (this.state.showAddAddressSheet) {
                this.addAddressSheet.snapTo(0)
            } else {
                this.addAddressSheet.snapTo(1)
            }
        })
    }

    toggleAccountActivatedSuccessfullyAlert = () => {
        if (this.state.showAccountActivatedSuccessfullyAlert) {
            setTimeout(() => {
                this.setState({ showAccountActivatedSuccessfullyAlert: false })
            }, 2100)
        } else {
            this.setState({ showAccountActivatedSuccessfullyAlert: true })
        }
    }

    toggleActivateAccountAlert = () => {

    }

    renderAddressSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addressSheet = ref
                }}
                onCloseEnd={() => this.setState({ showLocationSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(190), 0]}
                initialSnap={this.state.showLocationSheet ? 0 : 1}
                title={'Add your delivery address'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        backgroundColor={Colors.grey80}
                        onPress={() => {
                            this.toggleAddressSheet()
                            this.toggleAddAddressSheet()
                        }}
                        prefixIcon={Images.location}
                        text={'CURRENT LOCATION'} />

                    <View style={{ height: vs(12) }} />

                    <Button
                        backgroundColor={Colors.grey80}
                        prefixIcon={Images.add1}
                        onPress={() => {
                            this.toggleAddressSheet()
                            this.toggleAddLocationSheet()
                        }}
                        text={'ADD ADDRESS'} />
                </View>
            </BottomSheet>
        )
    }

    renderAddLocationSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addLocationSheet = ref
                }}
                onCloseEnd={() => this.setState({ showAddLocationSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(600), 0]}
                initialSnap={this.state.showAddLocationSheet ? 0 : 1}
                title={'Add your location'}>
                <View style={{ flex: 1 }}>
                    <LocationSearchBox
                        onPressAddAddressManually={() => {
                            this.toggleAddLocationSheet()
                            this.toggleAddAddressSheet()
                        }}
                    />
                </View>
            </BottomSheet>
        )
    }

    renderAddAddressSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addAddressSheet = ref
                }}
                onCloseEnd={() => this.setState({ showAddAddressSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(600), 0]}
                initialSnap={this.state.showAddAddressSheet ? 0 : 1}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.popupHeader}>
                        <Text style={[styles.txtSave, { color: 'transparent' }]}>SAVE</Text>
                        <Text style={styles.popupTitle}>Add your delivery address</Text>
                        <TouchableOpacity>
                            <Text style={styles.txtSave}>SAVE</Text>
                        </TouchableOpacity>
                    </View>

                    <KeyboardAwareScrollView>
                        <TextInput
                            placeholder={'Pin Code'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'State (Province)'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Town or city'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Village or area'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'House number'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Flat number'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Landmark'}
                            style={styles.textInput}
                        />
                    </KeyboardAwareScrollView>

                </View>
            </BottomSheet>
        )
    }

    renderAccountActivatedSuccessfullyAlert() {
        return (
            <Alert
                visible={this.state.showAccountActivatedSuccessfullyAlert}
                message={'Your account has been activated successfully'}
                color={Colors.success}
                onDismiss={this.toggleAccountActivatedSuccessfullyAlert}
            />
        )
    }

    renderActivateAccountAlert() {
        return (
            <Alert
                visible={this.state.showAccountActivateAlert}
                title={'Activate First'}
                message={'You\'ve successfully registered your account. Please check your email for the activation link so can make full use of your account.'}
                color={Colors.secondary00}
                onDismiss={this.toggleActivateAccountAlert}
                action={() =>
                    <View style={{ width: s(120) }}>
                        <RadiusButton text={'RESEND EMAIL'} />
                    </View>
                }
            />
        )
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.icSearch} />

                <Image source={Images.logo3} style={styles.logo} resizeMode={'contain'} />

                <TouchableOpacity onPress={this.toggleAddressSheet}>
                    <Image source={Images.search} style={styles.icSearch} />
                </TouchableOpacity>
            </View>
        )
    }

    renderCategories() {
        return (
            <View style={styles.categryContainer}>
                <FlatList
                    contentContainerStyle={styles.categoryListContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const isFocused = this.state.selectedCategory === index
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ selectedCategory: index })
                                }}
                                style={[styles.categoryItemContainer, !isFocused && { borderBottomColor: 'transparent' }]}>
                                <Text style={[styles.heading5Bold, { color: isFocused ? Colors.primary : Colors.grey60 }]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <LinearGradient
                    colors={['#ffffff00', Colors.white]}
                    start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }}
                    style={styles.v1}
                >
                    <TouchableOpacity style={styles.btnAddContainer}>
                        <Image source={Images.add1} style={styles.icAdd} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }

    renderAddressBar() {
        return (
            <View style={styles.addressBarContainer} >
                <View style={styles.row}>
                    <Image source={Images.locationMed} style={styles.icLocation} />
                    <Text style={styles.heading5Regular}>Deliver to - Tanil Nadu 12345</Text>
                    <View style={styles.areaContainer}>
                        <Text style={styles.heading6Bold}>Area 4</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <Image source={Images.arrow_left} style={styles.icArrowDown} />
                </TouchableOpacity>
            </View>
        )
    }

    renderStickyParts() {
        return (
            <View>
                {this.renderCategories()}
                {this.renderAddressBar()}
            </View>
        )
    }



    renderSortBar() {
        return (
            <View style={styles.sortBarContainer} >
                <TouchableOpacity style={styles.row}>
                    <Image source={Images.arrow_left} style={styles.icArrowDown2} />
                    <Text style={styles.txtBold}>Last Added</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.setState({ showProductAsRows: !this.state.showProductAsRows })
                }}>
                    <Image
                        source={this.state.showProductAsRows ? Images.sortRows : Images.sortSquares}
                        style={styles.icSort}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderProduct = (item, index) => {
        return (
            <View style={styles.productContainer} key={index.toString()}>
                <View style={[styles.row, { paddingHorizontal: AppConfig.paddingHorizontal }]}>
                    <Image source={{ uri: item.picture }} style={styles.productImage} />

                    <View style={styles.v2}>
                        <View>
                            <Text style={styles.heading4Bold}>{item.name}</Text>
                            <StarRating rating={item.rating} ratingCount={item.ratingCount} />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.v3}>
                                <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                                <Text style={styles.txtRetailPrice}>${item.retailPrice}</Text>
                            </View>

                            <View style={styles.v3}>
                                <Text style={[styles.txtNoteBold, { color: Colors.black }]}>WHOLE SALE PRICE</Text>
                                <Text style={styles.txtWholesalePrice}>${item.wholesalePrice}</Text>
                            </View>

                            <View style={styles.percentOffContainer}>
                                <Text style={[styles.heading6Bold, { color: Colors.secondary00 }]}>30% OFF</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.v4}>
                    <View>
                        <Text style={styles.txtOrderClose}>Order closes on:</Text>
                        <Text style={styles.heading6Regular}>{item.orderClose}</Text>
                    </View>

                    <View style={styles.row}>
                        <Image source={Images.stock} style={styles.icStock} />
                        <Text style={styles.txtOrderNumber}>{item.orderCount}/{item.inStock}</Text>
                        <TouchableOpacity>
                            <Image source={Images.info2} style={styles.icInfo} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity>
                            <Image source={Images.likeMed} style={styles.icShare} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={Images.share} style={styles.icShare} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    renderProducList() {
        return (
            <View style={styles.prodListContainer}>
                {
                    products.map((item, index) => this.renderProduct(item, index))
                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />

                <SafeAreaView
                    style={styles.mainContainer}
                    edges={['bottom', 'top', 'left', 'right']}>

                    <ScrollView
                        stickyHeaderIndices={[1]}
                        showsVerticalScrollIndicator={false}>
                        {this.renderHeader()}

                        {this.renderStickyParts()}

                        {this.renderSortBar()}

                        {this.renderProducList()}
                    </ScrollView>

                </SafeAreaView>

                {this.renderAddressSheet()}

                {this.renderAddLocationSheet()}

                {this.renderAddAddressSheet()}

                {/* background for bottom sheet */}
                {
                    (this.state.showLocationSheet || this.state.showAddLocationSheet || this.state.showAddAddressSheet) &&
                    <TouchableWithoutFeedback
                        onPress={() => {

                        }}>
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                alignItems: 'center',
                                backgroundColor: 'rgb(29,29,29)',
                                opacity: Animated.add(0.85, Animated.multiply(-1.0, this.fall)),
                            }}
                        />
                    </TouchableWithoutFeedback>
                }

                {this.renderAccountActivatedSuccessfullyAlert()}

                {this.renderActivateAccountAlert()}
            </View>
        )
    }
}

export default ExploreScreen

const categories = ['All', 'Announcements', 'Electronics', 'Food & Beverage', 'Fashion']

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