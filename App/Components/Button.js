import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Fonts, Colors } from '../Themes'
import PropTypes from 'prop-types'
import AppConfig from '../Config/AppConfig'

class Button extends Component {
    render() {
        const {
            text,
            onPress,
            disabled,
            backgroundColor,
            textColor,
            disabledColor,
            prefixIcon
        } = this.props

        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.container, { backgroundColor: backgroundColor }, disabled && { opacity: 0.25 }]}
                onPress={onPress}>
                {
                    prefixIcon &&
                    <Image style={[styles.icon, { tintColor: textColor }]} source={prefixIcon} />
                }
                <Text
                    style={[styles.txt, { color: textColor ?? Colors.white }]}
                >{text}</Text>
            </TouchableOpacity>
        )
    }
}


Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.any,
    disabled: PropTypes.bool,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    disabledColor: PropTypes.string,
}

Button.defaultProps = {
    backgroundColor: Colors.primary,
    textColor: Colors.white,
}

const styles = ScaledSheet.create({
    container: {
        height: '40@vs',
        backgroundColor: '#7FFFD4',
        borderRadius: '20@s',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    txt: {
        color: 'rgb(24,24,101)',
        fontSize: AppConfig.fontSize,
        fontFamily: Fonts.semibold,
    },
    icon: {
        width: '20@s',
        height: '20@s',
        marginRight: '5@s'
    }
})
export default Button