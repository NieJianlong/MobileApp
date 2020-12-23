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

class Button extends Component {
    render() {
        const {
            text,
            onPress,
            disabled,
            backgroundColor,
            textColor,
            disabledColor,
        } = this.props

        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.container, { backgroundColor: backgroundColor }]}
                onPress={onPress}>
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
        height: '36@vs',
        backgroundColor: '#7FFFD4',
        borderRadius: '18@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: 'rgb(24,24,101)',
        fontSize: '14@s',
        fontFamily: Fonts.semibold,
    },
})

export default Button