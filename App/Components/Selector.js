import React, { Component, useState } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import PropTypes from 'prop-types'

import { Fonts, Colors, Images, ApplicationStyles } from '../Themes'
import colors from '../Themes/Colors'
import fonts from '../Themes/Fonts'

function Selector(props) {

    const [active, setActive] = useState(false)

    const [value, setValue] = useState('')

    const {
        style,
        showError,
        title,
        data,
        placeholder,
    } = props

    return (
        <View>
            <View style={[styles.container, style, showError && styles.errorContainer]}>
                <TouchableOpacity onPress={() => setActive(!active)}>
                    <Text style={[styles.txtPlaceholder, value !== '' && { color: Colors.black }]}>
                        {value !== '' ? value : placeholder}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActive(!active)}>
                    <Image
                        source={Images.arrow_left}
                        style={styles.icArrow}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>

            {
                active &&
                data.map((item, index) =>
                    <TouchableOpacity
                        key={index.toString()}
                        onPress={() => {
                            setValue(item)
                            setActive(false)
                        }}
                        style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )

}

Selector.propTypes = {

}

Selector.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '50@vs',
        backgroundColor: Colors.white,
        borderRadius: '30@s',
        borderWidth: 1,
        borderColor: Colors.grey20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '20@s'
    },
    errorContainer: {
        borderColor: Colors.error
    },
    errorText: {
        fontFamily: Fonts.primary,
        color: Colors.error,
        fontSize: '14@s',
        marginTop: '3@vs',
        marginLeft: '15@s'
    },
    txtTitle: {
        ...ApplicationStyles.screen.heading6Bold,
        color: Colors.grey40
    },
    txtValue: {
        ...ApplicationStyles.screen.heading5Bold,
    },
    txtPlaceholder: {
        ...ApplicationStyles.screen.txtRegular,
        color: Colors.grey40
    },
    icArrow: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.grey60,
        transform: [{ rotate: '270deg' }]
    },
    itemContainer: {
        paddingVertical: '7@vs',
        paddingLeft: '20@s'
    },
    itemText: {
        ...ApplicationStyles.screen.heading5Regular,
    }
})
export default Selector