import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { vs } from 'react-native-size-matters'

import {
    AppBar,
    Button,
    TextInput,
    MaterialTextInput
} from '../../Components'
import { Colors } from '../../Themes'

import styles from './styles'

class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            keyboardHeight: 0,
        }

        Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
        Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', this._keyboardWillShow)
        Keyboard.removeListener('keyboardWillHide', this._keyboardWillHide)
    }

    _keyboardWillShow = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    }

    _keyboardWillHide = () => {
        this.setState({
            keyboardHeight: 0
        })
    }

    validateEmail = (email) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return reg.test(email)
    }

    validatePhone = (phone) => {
        const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        return reg.test(phone)
    }

    renderAction() {
        return (
            <View>
                <Button
                    disabled={!this.validateEmail(this.state.email) && !this.validatePhone(this.state.email)}
                    onPress={() => {
                        if (this.validateEmail(this.state.email)) {
                            this.props.navigation.navigate('LoginScreen')
                        } else if (this.validatePhone(this.state.email)) {
                            this.props.navigation.navigate('OTPScreen', { fromScreen: 'ForgotPasswordScreen' })
                        }
                    }}
                    text={'RESET PASSWORD'} />

                <View style={{ height: this.state.keyboardHeight > 0 ? this.state.keyboardHeight : isIphoneX() ? 0 : vs(15) }} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.safeArea}
                    edges={['top', 'right', 'left', 'bottom']}
                >
                    <AppBar
                        showLogo={false}
                        onPressBack={() => this.props.navigation.goBack()}
                    />

                    <View style={styles.bodyContainer}>
                        <Text style={styles.heading2Bold}>Forgot your password?</Text>
                        <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
                            Please enter your information below to create a new one
                        </Text>

                        <TextInput
                            style={{ marginTop: vs(12) }}
                            placeholder={'Email or phone number'}
                            onChangeText={(text) => {
                                this.setState({ email: text })
                            }}

                        />

                        <View style={{ flex: 1 }} />

                        {this.renderAction()}

                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default ForgotPasswordScreen