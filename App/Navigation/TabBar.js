import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isIphoneX } from 'react-native-iphone-x-helper'

import { Colors, Images } from '../Themes'

class TabBar extends Component {

    getIconSource = (routeName, isFocused) => {
        switch (routeName) {
            case 'ExploreScreen':
                return Images.logo1
            case 'PackageScreen':
                return isFocused ? Images.packageFilled : Images.packageMed
            case 'CartScreen':
                return isFocused ? Images.cartFilled : Images.cartMed
            case 'FollowScreen':
                return isFocused ? Images.likeFilled : Images.likeMed
            case 'MenuScreen':
                return Images.dots
        }
    }

    render() {
        const { routes, index } = this.props.navigation.state

        return (
            <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
                <View style={styles.container}>
                    {routes.map((route, idx) => {
                        const isFocused = idx === this.props.navigation.state.index
                        const onPress = () => {
                            this.props.navigation.navigate(route.routeName)
                        }

                        return (
                            <TouchableOpacity
                                style={styles.iconContainer}
                                key={idx.toString()}
                                onPress={onPress}>
                                <Image
                                    resizeMode={'contain'}
                                    source={this.getIconSource(route.routeName, isFocused)}
                                    style={[styles.icon, isFocused && { tintColor: Colors.primary }]}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </SafeAreaView>
        )
    }
}

export default TabBar

const styles = ScaledSheet.create({
    safeAreaView: {
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: isIphoneX() ? '0@vs' : '10@vs',
        paddingTop: '10@vs'
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: '35@s',
        height: '35@s',
        tintColor: Colors.grey60
    }
})