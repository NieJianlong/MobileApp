import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'

import styles from './styles'

import {
    Button
} from '../../../Components'
import ProductItem from '../Components/ProductItem'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'

function OrderPlaced(props) {
    
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={styles.icSearch} />

                <Image source={Images.logo3} style={styles.logo} resizeMode={'contain'} />

                <TouchableOpacity
                    onPress={() => {
                        NavigationService.goBack()
                    }}
                >
                    <Image source={Images.crossMedium} style={styles.icSearch} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderBody = () => {
        return (
            <ScrollView style={styles.body}>
                <View style={styles.textArea}>
                    <Text style={styles.txt1}>
                        Your order has been{'\n'}processed sucessfully
                    </Text>

                    <Text style={styles.txt2}>
                        Remember that you will not receive your order until the number of people required to make the purchase has been reached.
                    </Text>
                </View>

                <Text style={styles.txt3}>Inform your group</Text>

                <View style={styles.informContainer}>
                    <View style={styles.row}>
                        <Image
                            style={styles.productImage}
                            source={{ uri: 'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000' }}
                        />

                        <View>
                            <Text style={styles.heading5Bold}>iPhone 11</Text>
                            <Text style={styles.heading6Regular}>User name</Text>
                        </View>
                    </View>

                    {renderChatOptions()}
                </View>

                <Text style={styles.txt3}>Who bought this item also bought...</Text>

                {renderProducList()}
            </ScrollView>
        )
    }

    const renderChatOptions = () => {
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

    const renderProduct = (item, index) => {
        return (
            <ProductItem
                key={index.toString()}
                product={item}
                size={'M'}
            />
        )
    }

    const renderProducList = () => {
        return (
            <View style={styles.prodListContainer}>
                {
                    products.map((item, index) => renderProduct(item, index))
                }
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView
                style={styles.container}
                edges={['top', 'left', 'right']}>

                {renderHeader()}

                {renderBody()}

            </SafeAreaView>
        </View>
    )
}

export default OrderPlaced

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