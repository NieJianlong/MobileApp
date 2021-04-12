import React, { Component } from 'react'
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

class Picker extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {
            style,
            showError,
            title,
            value,
            onPress
        } = this.props

        return (
            <TouchableOpacity 
                onPress={onPress}
                style={[styles.container, style, showError && styles.errorContainer]}>
                <View>
                    <Text style={styles.txtTitle}>
                        {title}
                    </Text>
                    <Text style={styles.txtValue}>
                        {value}
                    </Text>
                </View>

                <Image 
                    source={Images.arrow_left} 
                    style={styles.icArrow} 
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
        )
    }
}

Picker.propTypes = {

}

Picker.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '54@vs',
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
    icArrow: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.grey60,
        transform: [{rotate: '270deg'}]
    }
})
export default Picker