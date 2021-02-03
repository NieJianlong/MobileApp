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
    StarRating,
    ProductSearchBox
} from '../../Components'
import CheckBox from './Components/CheckBox'
import ProductItem from './Components/ProductItem'
import ShareOptionList from './Components/ShareOptionList'

import { Colors, Images } from '../../Themes'
import styles from './styles'
import NavigationService from '../../Navigation/NavigationService'

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
            showSortBySheet: false,
            showShareSheet: false,

            selectedCategory: 0,
            showProductAsRows: true,
            sortOption: 1,
            keyword: ''
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

    toggleSortBySheet = () => {
        this.setState({ showSortBySheet: !this.state.showSortBySheet }, () => {
            if (this.state.showSortBySheet) {
                this.sortBySheet.snapTo(0)
            } else {
                this.sortBySheet.snapTo(1)
            }
        })
    }

    toggleShareSheet = () => {
        this.setState({ showShareSheet: !this.state.showShareSheet }, () => {
            if (this.state.showShareSheet) {
                this.shareSheet.snapTo(0)
            } else {
                this.shareSheet.snapTo(1)
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
                snapPoints={[vs(210), 0]}
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

    renderSortBySheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.sortBySheet = ref
                }}
                onCloseEnd={() => this.setState({ showSortBySheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(320), 0]}
                initialSnap={this.state.showSortBySheet ? 0 : 1}
                title={'Sort By'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {
                        sortOptions.map((i, index) => {
                            return (
                                <View key={index.toString()}>
                                    <View style={{ height: vs(12) }} />
                                    <CheckBox
                                        defaultValue={this.state.sortOption === index}
                                        onSwitch={(t) => this.setState({ sortOption: index })}
                                        label={i} />
                                </View>
                            )
                        })
                    }
                </View>
            </BottomSheet>
        )
    }

    renderShareSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.shareSheet = ref
                }}
                onCloseEnd={() => this.setState({ showShareSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(580), 0]}
                initialSnap={this.state.showShareSheet ? 0 : 1}
                title={'Share to'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <ShareOptionList />
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

    onSearch = (keyword) => {
        this.setState({ keyword })
    }

    renderHeader() {
        if (this.state.keyword === '') {
            return (
                <View style={styles.header}>
                    <View style={styles.icSearch} />

                    <Image source={Images.logo3} style={styles.logo} resizeMode={'contain'} />

                    <TouchableOpacity
                        onPress={() => {
                            NavigationService.navigate('ProductSearchScreen', {
                                onSearch: this.onSearch
                            })
                        }}
                    >
                        <Image source={Images.search} style={styles.icSearch} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.header, { paddingVertical: vs(10) }]}>
                    <ProductSearchBox
                        disabled={true}
                        keyword={this.state.keyword}
                        onPressDelete={() => this.setState({ keyword: '' })}
                    />
                </View>
            )
        }
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

                <TouchableOpacity onPress={this.toggleAddressSheet}>
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
                <TouchableOpacity
                    onPress={this.toggleSortBySheet}
                    style={styles.row}>
                    <Image source={Images.arrow_left} style={styles.icArrowDown2} />
                    <Text style={styles.txtBold}>{sortOptions[this.state.sortOption]}</Text>
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
            <ProductItem
                onPressShare={this.toggleShareSheet}
                key={index.toString()}
                product={item}
                size={this.state.showProductAsRows ? 'M' : 'L'}
            />
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
                    edges={['top', 'left', 'right']}>

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

                {this.renderSortBySheet()}

                {this.renderShareSheet()}

                {/* background for bottom sheet */}
                {
                    (this.state.showLocationSheet ||
                        this.state.showAddLocationSheet ||
                        this.state.showAddAddressSheet ||
                        this.state.showSortBySheet ||
                        this.state.showShareSheet
                    ) &&
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

const sortOptions = [
    'About to be completed',
    'Last added',
    'Price: low to high',
    'Price: high to low',
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