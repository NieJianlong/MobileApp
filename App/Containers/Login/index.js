import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { vs } from 'react-native-size-matters'

import {
    TextInput,
    Button,
    PasswordInput,
    Alert,
} from '../../Components'

import { Colors, Images } from '../../Themes'
import styles from './styles'

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyboardHeight: 0,
            showResetPasswordAlert: false,
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

    toggleResetPasswordAlert = () => {
        this.setState({ showResetPasswordAlert: !this.state.showResetPasswordAlert })
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

    renderResetPasswordAlert() {
        return (
            <Alert
                visible={this.state.showResetPasswordAlert}
                title={'Email/SMS Sent'}
                message={'We have sent you an email, please use the link on it to proceed with your new password creation.'}
                color={Colors.secondary00}
                onDismiss={this.toggleResetPasswordAlert}
            />
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
                    <View style={styles.bodyContainer}>

                        <Text style={styles.txt1}>Sign In</Text>

                        <Text style={styles.txt2}>
                            Join purchases to get what{'\n'}you want with great discounts
                        </Text>

                        <TextInput
                            style={styles.emailInput}
                            placeholder={'Email or phone number'}
                        />

                        <PasswordInput
                            style={styles.passwordInput}
                            placeholder={'Enter your password'}
                        />

                        <View style={{ height: this.state.keyboardHeight - vs(100) }} />

                        <Button
                            onPress={() => {
                                this.props.navigation.navigate('MainScreen')
                            }}
                            text={'SIGN IN'}
                        />

                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                                <Text style={styles.txtAction}>I FORGOT MY PASSWORD</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                                <Text style={styles.txtAction}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

                {this.renderResetPasswordAlert()}
            </View>
        )
    }
}

export default LoginScreen