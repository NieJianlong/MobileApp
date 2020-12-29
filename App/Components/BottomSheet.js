import React, { Component } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { ScaledSheet, s } from 'react-native-size-matters'
import BottomSheetLib from 'reanimated-bottom-sheet'
import { isIphoneX } from 'react-native-iphone-x-helper'

import { Fonts, Colors } from '../Themes'
import AppConfig from '../Config/AppConfig'

class BottomSheet extends Component {
    render() {
        const {
            snapPoints,
            initialSnap,
            customRef,
            title,
            callbackNode,
            onCloseEnd,
        } = this.props

        return (
            <BottomSheetLib
                ref={customRef}
                snapPoints={snapPoints}
                initialSnap={initialSnap}
                borderRadius={s(20)}
                callbackNode={callbackNode}
                onCloseEnd={onCloseEnd}
                renderContent={() => {
                    return (
                        <View style={[styles.container, { height: snapPoints[0] }]}>
                            <View style={styles.line} />
                            {
                                title &&
                                <View style={styles.header}>
                                    <Text style={styles.title}>{title}</Text>
                                </View>
                            }

                            {this.props.children}

                            <View style={styles.paddingBottom} />
                        </View>
                    )
                }}
            />
        )
    }
}

BottomSheet.propTypes = {

}

BottomSheet.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '15@s',
        paddingTop: '8@vs',
        backgroundColor: Colors.background,
        borderTopLeftRadius: '20@s',
        borderTopRightRadius: '20@s',
    },
    line: {
        width: '50@s',
        height: '6@vs',
        backgroundColor: '#DDDFE3',
        alignSelf: 'center',
        borderRadius: '4@s',
    },
    header: {
        flexDirection: 'row',
        paddingVertical: '20@vs',
        alignItems: 'center'
    },
    title: {
        color: Colors.black,
        fontSize: AppConfig.fontSize,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        flex: 1
    },
    paddingBottom: {
        paddingBottom: isIphoneX() ? '20@vs' : '15@vs'
    },
    background: {
        flex: 1,
        //backgroundColor: 'rgba(41,41,41,0.9)',
        //position: 'absolute',
        backgroundColor: '#2c2c2f',
        width: '100%',
        height: '100%'
    }
})

export default BottomSheet