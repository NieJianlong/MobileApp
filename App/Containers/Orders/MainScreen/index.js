import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    Button
} from '../../../Components'
import NavigationService from '../../../Navigation/NavigationService'
import { Images } from '../../../Themes'

import styles from './styles'

class OrderScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hasOrders: false
        }
    }

    componentDidMount() {

    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.icSearch} />

                <Image source={Images.logo3} style={styles.logo} resizeMode={'contain'} />

                {
                    this.state.hasOrders ?
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('ProductSearchScreen', {
                                    onSearch: this.onSearch
                                })
                            }}
                        >
                            <Image source={Images.search} style={styles.icSearch} />
                        </TouchableOpacity> :
                        <View style={styles.icSearch} />
                }

            </View>
        )
    }

    renderNoOrder() {
        return (
            <View>
                <View style={styles.noOrderText}>
                    <Text style={styles.txt1}>
                        It looks like you haven't placed any order yet
                    </Text>
                    <Text style={styles.txt2}>
                        You can start exploring products right now!
                    </Text>
                </View>

                <Button 
                    onPress={() => NavigationService.goBack()}
                    text={'EXPLORE PRODUCTS'} />
            </View>
        )
    }

    renderBody() {
        return (
            <View style={styles.bodyContainer}>
                {
                    this.state.hasOrders ?
                        <ScrollView showsVerticalScrollIndicator={false}>

                        </ScrollView> :
                        this.renderNoOrder()
                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.safeArea}
                    edges={['top', 'right', 'left', 'bottom']}
                >
                    {this.renderHeader()}

                    {this.renderBody()}
                </SafeAreaView>
            </View>
        )
    }
}

export default OrderScreen