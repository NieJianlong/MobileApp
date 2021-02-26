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

import styles from './styles'

import {
    ProductSearchBox,
    AppBar
} from '../../../Components'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'
import { vs } from 'react-native-size-matters'

class InvoiceScreen extends Component {

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
                    rightButton={() =>
                        <TouchableOpacity>
                            <Image
                                resizeMode={'contain'}
                                style={styles.icDownload}
                                source={Images.download} />
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }

    renderDeliverTo() {
        return (
            <View style={styles.sectionContainer}>
                <View>
                    <Text style={styles.txtOrder}>ORDER 32454</Text>
                    <View style={{ height: vs(10) }} />
                    <Text style={styles.txtName}>User Name</Text>
                    <Text style={styles.txtAddress}>
                        Streetname 00/Apt 404 - 00000 County, City
                    </Text>
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.txtOrder}>TOTAL</Text>
                    <View style={{ height: vs(10) }} />
                    <Text style={styles.txtMoney}>$1,552.60</Text>
                    <Text style={styles.txtAddress}>
                        20 Oct, 2020
                    </Text>
                </View>
            </View>
        )
    }

    renderSellerInfo() {
        return (
            <View style={styles.sellerContainer}>
                <Text style={styles.heading4Bold}>Sold by</Text>
                <Text style={[styles.txtRegular, { marginVertical: vs(10) }]}>
                    Seller Name, Streetname 00/Apt 404 - 00000 County, City - Country
                </Text>
            </View>
        )
    }

    renderPrice() {
        return (
            <View style={styles.priceContainer}>
                <Text style={[styles.heading4Bold, { marginBottom: vs(15) }]}>Your order</Text>

                <View style={styles.v2}>
                    <View>
                        <View style={styles.row}>
                            <View style={styles.amountContainer}>
                                <Text style={styles.heading4Bold}>1</Text>
                            </View>
                            <Text style={styles.heading4Regular}>Product Name goes here</Text>
                        </View>
                        <Text style={styles.productOptionText}>Selected product options goes here</Text>
                    </View>
                    <Text style={styles.txt1}>$1.5999,67</Text>
                </View>

                <View style={styles.line} />

                <Text style={[styles.heading4Bold, { marginBottom: vs(15) }]}>Total</Text>

                <View style={styles.v2}>
                    <Text style={styles.heading4Regular}>Subtotal</Text>
                    <Text style={styles.heading4Regular}>$1.6999,98</Text>
                </View>

                <View style={styles.v2}>
                    <Text style={styles.heading4Regular}>Service fee</Text>
                    <Text style={styles.heading4Regular}>$8,98</Text>
                </View>

                <View style={styles.v2}>
                    <Text style={styles.heading4Regular}>Delivery</Text>
                    <Text style={styles.heading4Regular}>$9,98</Text>
                </View>

                <View style={styles.v2}>
                    <Text style={styles.heading4Regular}>Total savings</Text>
                    <Text style={styles.heading4Regular}>$699,98</Text>
                </View>

                <View style={styles.v2}>
                    <Text style={styles.heading4Bold}>Total</Text>
                    <Text style={styles.heading4Bold}>$999,98</Text>
                </View>
            </View>
        )
    }

    renderBody() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}>
                {this.renderDeliverTo()}

                {this.renderSellerInfo()}

                {this.renderPrice()}
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

export default InvoiceScreen