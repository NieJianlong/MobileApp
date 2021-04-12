import React, { useState, useEffect } from 'react'
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

import { Colors  } from '../../Themes'
import styles from './styles'

/**
 * validation and jwt modules
 */
import * as validator from '../../Validation'
import * as jwt from '../../Apollo/jwt-request'
import * as storage from '../../Apollo/local-storage'
import { useQuery } from '@apollo/client';
/** here GET_USER_PROFILE is the query for the cache to get userProfileVar */
import { GET_USER_PROFILE, userProfileVar } from '../../Apollo/cache'


function LoginScreen(props ) {
    let passwordInput = null
 
    let [keyboardHeight, setKeyboardHeight] = useState(0)
    let [showResetPasswordAlert, setShowResetPasswordAlert] = useState(false)
    let [showValidationAlert, setShowValidationAlert] = useState(false)
    let [loginInput, setLoginInput] = useState('')
    let [psswd, setPsswd] = useState('')

    const profile = useQuery(GET_USER_PROFILE);
 
    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', _keyboardWillShow)
        Keyboard.addListener('keyboardWillHide', _keyboardWillHide)
        //console.log ('debug loginScreen useEffect'+JSON.stringify(props.navigation.state))
        /**
         * this page is a bit diferent as the navigation params will aways be
         * undefined unless in the single case where we are coming from
         * ForgotPassword
         */
        if(props.navigation.state.params=== undefined) {
            //console.log ('debug message caught expected undefined parameter')  
        } else {
            //  console.log (`'debug message ${props.navigation.state.params.showEms}`)
             toggleResetPasswordAlert()
        }
 
        return () => {
            // Anything in here is fired on component unmount.
            Keyboard.removeListener('keyboardWillShow', _keyboardWillShow)
            Keyboard.removeListener('keyboardWillHide', _keyboardWillHide)
        }
    }, [props]);


    const onSignIn = async () => {
        // see /home/ubu5/vk-dev/MobileApp/__tests__/v_tests.js  'test determine user input'
        console.log('onSignIn' + `${loginInput}:::${psswd}`)// to-do remove
        let ret = validator.loginDifferentiator(loginInput)
        if (ret.isValid) {
            // we are good test for email or phone
            if (ret.isEmail) {
                userProfileVar({
                    email: loginInput,
                    isAuth: true
                })
                console.log(profile.data.userProfileVar.email)// to-do remove
                await jwt.runMockTokenFlow().then(function (res) {
                    // need check for status code = 200 
                    // below is a mock for the expected jwt shpould be something like res.data.<some json token id>
                    storage.setLocalStorageValue(storage.LOCAL_STORAGE_TOKEN_KEY, 'somejwt')
                    if (psswd === 'admin') {
                        props.navigation.navigate('MainScreen')
                    } else {
                        console.log('psswd is not correct')
                        toggleResetValidationAlert()
                    }

                }).catch(function (err) {
                    // here we will need to deal with a  status` code 401 and refresh jwt and try again

                })


            } else {
                // must be phone   
                console.log('phone is valid but not implemented')
                userProfileVar({
                    phone: loginInput,
                    isAuth: true
                })
                toggleResetValidationAlert()
            }
        } else {
            console.log('data not valid')
            toggleResetValidationAlert()
        }
    }

    const toggleResetPasswordAlert = () => {
        setShowResetPasswordAlert(!showResetPasswordAlert)
    }

    const toggleResetValidationAlert = () => {
        setShowValidationAlert(!showValidationAlert)
    }

    const _keyboardWillShow = (e) => {
        setKeyboardHeight(e.endCoordinates.height)
    }

    const _keyboardWillHide = () => {
        setKeyboardHeight(0)
    }

    const renderResetPasswordAlert = () => {
        return (
            <Alert
                visible={showResetPasswordAlert}
                title={'Email/SMS Sent'}
                message={'We have sent you an email, please use the link on it to proceed with your new password creation.'}
                color={Colors.secondary00}
                onDismiss={toggleResetPasswordAlert}
            />
        )
    }

    const renderValidationAlert = () => {
        return (
            <Alert
                visible={showValidationAlert}
                title={'Check Credentials'}
                message={'message to do'}
                color={Colors.warning}
                onDismiss={toggleResetValidationAlert}
            />
        )
    }

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
                        onSubmitEditing={() => passwordInput.getInnerRef().focus()}
                        returnKeyType={'next'}
                        onChangeText={text => setLoginInput(text)}

                    />

                    <PasswordInput
                        style={styles.passwordInput}
                        placeholder={'Enter your password'}
                        ref={(r) => passwordInput = r}
                        onSubmitEditing={onSignIn}
                        returnKeyType={'done'}
                        onChangeText={text => setPsswd(text)}
                    />

                    <View style={{ height: keyboardHeight - vs(100) }} />

                    <Button
                        onPress={onSignIn}
                        text={'SIGN IN'}
                    />

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordScreen')}>
                            <Text style={styles.txtAction}>I FORGOT MY PASSWORD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('RegisterScreen')}>
                            <Text style={styles.txtAction}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {renderResetPasswordAlert()}
            {renderValidationAlert()}
        </View>
    )
}


export default LoginScreen