import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import PropTypes from 'prop-types'

import { Fonts, Colors, Images } from '../Themes'

class PasswordInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
        }
    }

    render() {
        
        const {
            placeholder,
            style
        } = this.props

        return (
            <View>
                <View style={[styles.container, style]}>
                    <TextInput
                        placeholder={placeholder}
                        style={styles.textInput}
                        secureTextEntry={!this.state.showPassword}
                    />
                    <TouchableOpacity
                        style={styles.btnView}
                        onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                    >
                        <Image source={Images.view} style={[styles.icView, this.state.showPassword && {tintColor: Colors.grey80}]} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

PasswordInput.propTypes = {

}

PasswordInput.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '40@vs',
        backgroundColor: Colors.white,
        borderRadius: '20@s',
        borderWidth: 1,
        borderColor: Colors.grey20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '10@s'
    },
    icSearch: {
        width: '25@s',
        height: '25@s',
        tintColor: Colors.grey60
    },
    icView: {
        width: '23@s',
        height: '23@s',
        tintColor: Colors.grey20
    },
    btnView: {
        width: '30@s',
        height: '30@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        paddingLeft: '5@s',
        height: '100%',
        fontSize: '14@s',
        fontFamily: Fonts.primary,
        color: Colors.black
    }
})
export default PasswordInput