import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { vs } from 'react-native-size-matters'

import {
    AppBar,
    Button,
} from '../../Components'
import { Colors } from '../../Themes'

import styles from './styles'


class OTPScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            onFocus: 1,
            keyboardHeight: 0,
            allowToResendCode: false,
        }

        Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
        Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ allowToResendCode: true })
        }, 10000)
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

    renderOTPInput() {
        return (
            <View style={styles.otpContainer}>
                <TextInput
                    autoFocus
                    style={this.state.onFocus === 1 ? styles.txtInputFocused : styles.txtInput}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    value={this.state.field1}
                    ref={r => this.field1 = r}
                    onFocus={() => this.setState({ onFocus: 1 })}
                    onChangeText={(text) => {
                        this.setState({ field1: text }, () => {
                            if (text.length > 0) {
                                this.field2.focus()
                            }
                        })
                    }}
                />

                <TextInput
                    style={this.state.onFocus === 2 ? styles.txtInputFocused : styles.txtInput}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    value={this.state.field2}
                    ref={r => this.field2 = r}
                    onFocus={() => this.setState({ onFocus: 2 })}
                    onChangeText={(text) => {
                        this.setState({ field2: text }, () => {
                            if (text.length > 0) {
                                this.field3.focus()
                            }
                        })
                    }}
                />

                <TextInput
                    style={this.state.onFocus === 3 ? styles.txtInputFocused : styles.txtInput}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    value={this.state.field3}
                    ref={r => this.field3 = r}
                    onFocus={() => this.setState({ onFocus: 3 })}
                    onChangeText={(text) => {
                        this.setState({ field3: text }, () => {
                            if (text.length > 0) {
                                this.field4.focus()
                            }
                        })
                    }}
                />

                <TextInput
                    style={this.state.onFocus === 4 ? styles.txtInputFocused : styles.txtInput}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    value={this.state.field4}
                    ref={r => this.field4 = r}
                    onFocus={() => this.setState({ onFocus: 4 })}
                    onChangeText={(text) => {
                        this.setState({ field4: text }, () => {
                            if (text.length > 0) {
                                Keyboard.dismiss()
                                this.setState({ onFocus: 0 })
                            }
                        })
                    }}
                />
            </View>
        )
    }

    renderAction() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.btnResendCode}>
                    <Text style={[styles.txtAction, !this.state.allowToResendCode && { color: Colors.grey80 }]}>
                        I DIDN{'\''}T RECEIVE A CODE
                    </Text>
                </TouchableOpacity>

                <Button
                    disabled={
                        this.state.field1 === '' ||
                        this.state.field2 === '' ||
                        this.state.field3 === '' ||
                        this.state.field4 === ''
                    }
                    onPress={() => {
                        if (this.props.navigation.state.params.fromScreen === 'ForgotPasswordScreen') {
                            this.props.navigation.navigate('CreateNewPasswordScreen')
                        } else {
                            this.props.navigation.navigate('ExploreScreen')
                        }
                    }}
                    text={'VALIDATE'} />

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
                        <Text style={styles.heading2Bold}>{'Validate your phone number'}</Text>
                        <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
                            Please enter the code number sent by sms to your phone [XXX XXX XXX]
                        </Text>

                        {this.renderOTPInput()}

                        <View style={{ flex: 1 }} />

                        {this.renderAction()}

                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default OTPScreen