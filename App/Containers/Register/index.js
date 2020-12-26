import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    TextInput,
    Button,
    PasswordInput,
    AppBar
} from '../../Components'

import { Colors, Images } from '../../Themes'
import styles from './styles'
import { vs } from 'react-native-size-matters'

class RegisterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyboardHeight: 0,
        }
    }

    componentDidMount() {

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
                        showLogo
                        onPressBack={() => this.props.navigation.goBack()}
                    />

                    <View style={styles.bodyContainer}>

                        <Text style={styles.heading2Bold}>Register</Text>

                        <Text style={styles.heading4Regular}>
                            Create an account to have access to the best  promos in your area!
                        </Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder={'Type your name'}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder={'Type your last name'}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder={'Type your email or phone number'}
                        />

                        <PasswordInput
                            style={styles.textInput}
                            placeholder={'Enter your password'}
                        />

                        <View style={{ flex: 1 }} />

                        <Button text={'REGISTER'} />

                        <TouchableOpacity style={styles.btnSignin}>
                            <Text style={styles.txtAction}>SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default RegisterScreen