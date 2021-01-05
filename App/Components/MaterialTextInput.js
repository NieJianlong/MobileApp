import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { TextField, OutlinedTextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types'

import { Fonts, Colors, Images } from '../Themes'
import colors from '../Themes/Colors'

class MaterialTextInput extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        const {
            placeholder,
            style,
            onFocus,
            onBlur,
        } = this.props

        return (
            <TextField
                label={placeholder}
                labelTextStyle={styles.labelTextStyle}
                labelFontSize={12}
                lineType={'none'}
                containerStyle={styles.container}
                tintColor={colors.grey40}
            />
        )
    }
}

MaterialTextInput.propTypes = {

}

MaterialTextInput.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '46@vs',
        backgroundColor: Colors.white,
        borderRadius: '23@s',
        borderWidth: 1,
        borderColor: Colors.grey20,
        justifyContent: 'center',
        paddingHorizontal: '15@s',
    },
    icSearch: {
        width: '25@s',
        height: '25@s',
        tintColor: Colors.grey60
    },
    icDelete: {
        width: '13@s',
        height: '13@s',
        tintColor: Colors.grey80
    },
    btnDelete: {
        width: '18@s',
        height: '18@s',
        backgroundColor: Colors.grey10,
        borderRadius: '10@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        paddingLeft: '5@s',
        height: '100%',
        fontSize: '14@s',
        fontFamily: Fonts.primary,
        color: Colors.black,
    },
    labelTextStyle: {
        //fontSize: '15@s',
        //fontFamily: Fonts.primary,
        color: Colors.grey40,
    }
})
export default MaterialTextInput