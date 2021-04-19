import React, { useState, useEffect } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//import { vs } from 'react-native-size-matters'

import {
    TextInput,
    Button,
    PasswordInput,
    AppBar,
    Switch,
    Alert,
} from '../../Components'

// validation and auth api
import * as validator from '../../Validation'
import * as jwt from '../../Apollo/jwt-request'

import { Colors } from '../../Themes'
import styles from './styles'


function RegisterScreen(props) {
    // refs
    let nameInput, lastNameInput, emailInput, passwordInput = null
    // validation
    let [validationDisplay, setValidationDisplay] = useState('')
    let [showValidationAlert, setShowValidationAlert] = useState(false)
    let [validationMessage, setValidationMessage] = useState('')
    // local state
    let [name, setName] = useState('')
    let [lastName, setLastName] = useState('')
    // registerInput  is indeterminate value that can be a phone or email
    let [registerInput, setRegisterInput] = useState('')
    let [psswd, setPsswd] = useState('')
    // because of the way the switch component is set up this is the opposite of what you would expect
    let [termsAccepted, setTermsAccepted] = useState(true)

    useEffect(() => {
        // setName('')
        // setLastName('')
        // setRegisterInput('')
        // setPsswd('')
        return () => {
            // Anything in here is fired on component unmount.
          
        }
    }, [])

 

    const onRegister = async () => {
        // first decide are we an email or a phone
        let registerUserBody = {}
        let registerUserValidation = { name, lastName, registerInput, psswd }
        setValidationDisplay(``)
        console.log(`${name}::${lastName}::${registerInput}::${psswd}:: `)

        // here registerInput can be email or phone
        let reporter = validator.registerValidator(registerUserValidation)
        console.log(`validation state ${JSON.stringify(reporter)}`)
        // first validate for missing values 
        if (reporter.hasMissing) {
            setValidationDisplay(`${reporter.missingVal} is required`) 

        } else {
            // now check is valid password
            if (!reporter.validPassword) {
                setValidationDisplay(`Password requires 1 uppercase, 1 number and min 8 characters`) 
                return
            }
            // now check is valid email or phone
            if (reporter.validPhoneOrEmail) {
                console.log(`setTermsAccepted=${termsAccepted}`)
                if(termsAccepted) {
                    setValidationDisplay(`Please accept terms and privacy policy`) 
                    return
                }
                // we are good so we can  test for email or phone
                if (reporter.isEmail) {
                    // mock api call for register user
                    registerUserBody = {
                        "name": name,
                        "lastName": lastName,
                        "email": registerInput,
                        "password": psswd
                    }

                } else {
                    // must be phone
                    registerUserBody = {
                        "name": name,
                        "lastName": lastName,
                        "phone": registerInput,
                        "password": psswd
                    }
                }

                await jwt.runMockRegisterFlow(registerUserBody).then(function (res) {
                    // below is a mock for the expected api response shpould be something like res.data.<some api response>
                    console.log(res)
                    resetValidation()
                    props.navigation.navigate('OTPScreen', { fromScreen: 'RegisterScreen' })
                    
                }).catch(function (err) {
                    // here we will need to check status code and gracefully deal with error

                })

            } else {
                setValidationDisplay(` phone or email is invalid`)
            }
      

        }// end else => no missing fields block
    
    }

    const resetValidation  = () => {
        console.log('resetValidation')
        setName('')
        setLastName('')
        setRegisterInput('')
        setPsswd('')
 
    }

    const toggleResetValidationAlert = () => {
        setShowValidationAlert(!showValidationAlert)
    }

    const toggleTermsAccepted = () => {
        setTermsAccepted(!termsAccepted)
 
    }

    const renderValidationAlert = () => {
        return (
            <Alert
                visible={showValidationAlert}
                title={'One or more input(s) are not correct'}
                message={validationMessage}
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
                <AppBar
                    showLogo
                    onPressBack={() => props.navigation.goBack()}
                />

                <View style={styles.bodyContainer}>

                    <Text style={styles.heading2Bold}>Register</Text>

                    <Text style={styles.heading4Regular}>
                        Create an account to have access to the best  promos in your area!
                        </Text>

                    <TextInput
                        style={styles.textInput}
                        ref={(r) => nameInput = r}
                        placeholder={'Type your name'}
                        onSubmitEditing={() => lastNameInput.getInnerRef().focus()}
                        returnKeyType={'next'}
                        onChangeText={text => setName(text)}
                        value={name}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder={'Type your last name'}
                        ref={(r) => lastNameInput = r}
                        onSubmitEditing={() => emailInput.getInnerRef().focus()}
                        returnKeyType={'next'}
                        onChangeText={text => setLastName(text)}
                        value={lastName}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder={'Type your email or phone number'}
                        ref={(r) => emailInput = r}
                        onSubmitEditing={() => passwordInput.getInnerRef().focus()}
                        returnKeyType={'next'}
                        onChangeText={text => setRegisterInput(text)}
                        value={registerInput}
                    />

                    <PasswordInput
                        style={styles.textInput}
                        placeholder={'Enter your password'}
                        ref={(r) => passwordInput = r}
                        //onSubmitEditing={onRegister}
                        defaultValue={''}
                        returnKeyType={'done'}
                        onChangeText={text => setPsswd(text)}
                        value={psswd}
                    />

                    <View style={styles.switch}>
                        <Switch 
                        onSwitch ={() => {
                            console.log('termsAccepted='+termsAccepted)
                            toggleTermsAccepted()
                            console.log('termsAccepted='+termsAccepted)
                        } } />
                        <TouchableOpacity onPress={() => props.navigation.navigate('LegalScreen', { tabIndex: 0 })}>
                            <Text style={styles.txtAccept}>I accept
                            <Text style={styles.txtPrivacy}> Privacy Policy </Text>
                                and
                            <Text style={styles.txtPrivacy}> Terms of use</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }} />
                    <Text style={styles.txtValidate}>{validationDisplay}  </Text>

                    <Button
                        // onPress={onRegister}
                        onPress={onDebug}
                        
                    <Button
                        onPress={onRegister}
                        text={'REGISTER'} />

                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={styles.btnSignin}>
                        <Text style={styles.txtAction}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {renderValidationAlert()}
        </View>
    )
 

}

export default RegisterScreen
