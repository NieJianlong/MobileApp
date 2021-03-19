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
import { s, vs } from 'react-native-size-matters'
import Animated from 'react-native-reanimated'

import styles from './styles'

import {
    AppBar,
    BottomSheetBackground,
    BottomSheet,
} from '../../../Components'
import ProductItem from '../Components/ProductItem'
import ShareOptionList from '../Components/ShareOptionList'
import CheckBox from '../Components/CheckBox'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'
import { ScrollView } from 'react-native-gesture-handler'

class SellerStoreScreen extends Component {

    fall = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.state = {
            showSortBySheet: false,

            showProductAsRows: true,
            sortOption: 1,
        }
    }

    componentDidMount() {

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

    renderHeader() {
        return (
            <View style={styles.header}>
                <AppBar
                    title={'Seller Name store'}
                    rightButton={() =>
                        <TouchableOpacity onPress={this.onPost}>
                            <Image source={Images.search} style={styles.icSearch} />
                        </TouchableOpacity>
                    }
                />
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

    renderBody() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.prodListContainer}>
                    {
                        products.map((item, index) => this.renderProduct(item, index))
                    }
                </View>
            </ScrollView>
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

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.container}
                    edges={['top', 'left', 'right']}>

                    {this.renderHeader()}

                    {this.renderSortBar()}

                    {this.renderBody()}

                </SafeAreaView>

                <BottomSheetBackground
                    visible={this.state.showSortBySheet}
                    controller={this.fall}
                />

                {this.renderSortBySheet()}
            </View>
        )
    }
}

export default SellerStoreScreen

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