import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './styles'

import {
    ProductSearchBox
} from '../../../Components'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'

class ProductSearchScreen extends Component {

    componentDidMount() {
        console.log(this.props.navigation)
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <ProductSearchBox
                    onSelect={(item) => {
                        this.props.navigation.state.params.onSearch(item)
                        NavigationService.goBack()
                    }}
                />
            </View>
        )
    }

    renderBody() {
        return (
            <View style={styles.body}>
                <Text style={styles.heading5Bold}>Recent searches</Text>

                {
                    recentSearches.map((i, index) =>
                        <View key={index.toString()} style={styles.recentSearchContainer}>
                            <View style={styles.v1}>
                                <Image style={styles.icClock} source={Images.clock} />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.state.params.onSearch(i)
                                        NavigationService.goBack()
                                    }}
                                >
                                    <Text style={styles.txtSearch}>
                                        {i}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <Image style={styles.icDelete} source={Images.crossMedium} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
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

export default ProductSearchScreen

const recentSearches = ['Apple', 'Cherry', 'Washing machine with the ability to wash 100kg of clothes in just 1 minute', 'Bucket and mop']