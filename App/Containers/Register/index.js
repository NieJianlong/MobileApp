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
<<<<<<< Updated upstream
=======
    }, [])

    /** use to work on otp to remove*/
    const onDebug = () => {
        props.navigation.navigate('OTPScreen', { fromScreen: 'RegisterScreen', phone:registerInput })
    }

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
                    props.navigation.navigate('OTPScreen', { fromScreen: 'RegisterScreen', phone:'+44781334567' })
                    
                }).catch(function (err) {
                    // here we will need to check status code and gracefully deal with error

                })

            } else {
                setValidationDisplay(` phone or email is invalid`)
            }
      

        }// end else => no missing fields block
    
>>>>>>> Stashed changes
    }

    componentDidMount() {

    }

    onRegister = () => {
        this.props.navigation.navigate('OTPScreen', { fromScreen: 'RegisterScreen' })
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
                            onSubmitEditing={() => this.lastNameInput.getInnerRef().focus()}
                            returnKeyType={'next'}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder={'Type your last name'}
                            ref={(r) => this.lastNameInput = r}
                            onSubmitEditing={() => this.emailInput.getInnerRef().focus()}
                            returnKeyType={'next'}
                        />

                        <TextInput
                            style={styles.textInput}
                            placeholder={'Type your email or phone number'}
                            ref={(r) => this.emailInput = r}
                            onSubmitEditing={() => this.passwordInput.getInnerRef().focus()}
                            returnKeyType={'next'}
                        />

                        <PasswordInput
                            style={styles.textInput}
                            placeholder={'Enter your password'}
                            ref={(r) => this.passwordInput = r}
                            onSubmitEditing={this.onRegister}
                            returnKeyType={'done'}
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

<<<<<<< Updated upstream
                        <Button
                            onPress={this.onRegister}
                            text={'REGISTER'} />
=======
                    <Button
                        // onPress={onRegister}
                        onPress={onDebug}
                        
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
>>>>>>> Stashed changes

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