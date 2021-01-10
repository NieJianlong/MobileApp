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
    PasswordInput
} from '../../Components'
import { Colors } from '../../Themes'

import styles from './styles'

class CreateNewPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
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

    validateConfirmPassword = () => {
        if (this.state.confirmPassword === '') {
            return true
        } else {
            return this.state.confirmPassword === this.state.password
        }
    }

    renderAction() {
        return (
            <View>
                <Button
                    disabled={this.state.password === '' || this.state.confirmPassword !== this.state.password}
                    onPress={() => {
                        this.props.navigation.navigate('ExploreScreen')
                    }}
                    text={'CREATE NEW PASSWORD'} />

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
                        <Text style={styles.heading2Bold}>Create your new password</Text>
                        <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
                            Choose a new password
                        </Text>

                        <PasswordInput
                            style={{ marginTop: vs(18) }}
                            placeholder={'New password'}
                            onChangeText={(text) => {
                                this.setState({ password: text }, () => console.log(this.state.password))
                            }}
                        />

                        <PasswordInput
                            style={{ marginTop: vs(18) }}
                            placeholder={'Repeat your new password'}
                            onChangeText={(text) => {
                                this.setState({ confirmPassword: text })
                            }}
                            showError={!this.validateConfirmPassword()}
                            errorMessage={'Password does not match'}
                        />

                        <View style={{ flex: 1 }} />

                        {this.renderAction()}

                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default CreateNewPasswordScreen