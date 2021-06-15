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

//radius button component
class RadiusButton extends Component {
    render() {
        const {
            //button's name
            text,
            //on press function
            onPress,
            //whether to disable this button
            disabled,
            backgroundColor,
            textColor,
            disabledColor,
            //prefix icon
            prefixIcon
        } = this.props

        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.container, { backgroundColor: backgroundColor }]}
                onPress={onPress}>
                {
                    prefixIcon &&
                    <Image style={[styles.icon, {tintColor: textColor}]} source={prefixIcon} />
                }
                <Text
                    style={[styles.txt, { color: textColor ?? Colors.white }]}
                >{text}</Text>
            </TouchableOpacity>
        )
    }
}


RadiusButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.any,
    disabled: PropTypes.bool,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    disabledColor: PropTypes.string,
}

RadiusButton.defaultProps = {
    backgroundColor: Colors.primary,
    textColor: Colors.white,
}

const styles = ScaledSheet.create({
    container: {
        height: '32@vs',
        width: 'auto',
        backgroundColor: '#7FFFD4',
        borderRadius: '20@s',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '10@s',
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
export default RadiusButton