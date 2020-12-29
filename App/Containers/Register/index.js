import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { vs } from 'react-native-size-matters'

import {
    TextInput,
    Button,
    PasswordInput,
    AppBar,
    Switch
} from '../../Components'

import { Colors, Images } from '../../Themes'
import styles from './styles'


class RegisterScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {

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

                        <View style={styles.switch}>
                            <Switch />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LegalScreen')}>
                                <Text style={styles.txtAccept}>I accept
                            <Text style={styles.txtPrivacy}> Privacy Policy </Text>
                                and
                            <Text style={styles.txtPrivacy}> Terms of use</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1 }} />

                        <Button
                            onPress={() => this.props.navigation.navigate('ExploreScreen')}
                            text={'REGISTER'} />

                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={styles.btnSignin}>
                            <Text style={styles.txtAction}>SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default RegisterScreen