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
import * as aQM from './gql/register_mutations'
import * as jwt from '../../Apollo/jwt-request'
import * as storage from '../../Apollo/local-storage'
import { endPointClient, PUBLIC_CLIENT_ENDPOINT } from '../../Apollo/public-api-v3'
/** userProfileVar is the variable for the cache to get set  userProfile attributes */
import { userProfileVar } from '../../Apollo/cache'

import { Colors } from '../../Themes'
import styles from './styles'
import NavigationService from '../../Navigation/NavigationService'


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
 
        return () => {
            // Anything in here is fired on component unmount.

        }
    }, [])

    /**
     * REGISTER_BUYER(registerBuyer) mutation is a public api endpoint
     * see  ./gql/register_mutations
     * collect state variable and run the mutation
     * on call back update local storage
     */
    const runRegisterBuyer = async() => {
        console.log(`${name}::${lastName}::${registerInput}::${psswd}`)
        // userName ===  email  && phoneNumber is required if empty
        // backend has not published list requried fields so languages and  
        // currencies seem to be needed, hence defaults here
        let BuyerProfileRequestForCreate = {
            userName: registerInput,
            firstName: name,
            lastName: lastName,
            geoLocation: '',
            guestBuyer: false,
            email:registerInput,
            phoneNumber: '',
            userType: 'BUYER',
            password: psswd,
            oneClickPurchaseOn: true,
            areaRegion: '',
            languages: [
                "EN"
            ], currencies: [
                "EUR"
            ]
        }

        // for some reason useMutation hook fails here so use standalone client for now
        let client = await endPointClient(PUBLIC_CLIENT_ENDPOINT)
        await client.mutate({
            mutation: aQM.REGISTER_BUYER,
            variables: { request: BuyerProfileRequestForCreate }
        })
            .then(result => {
                if (typeof result.data !== 'undefined') {
                    let buyerId = result.data.registerBuyer.buyerId
                    console.log(`registerBuyer buyerId=${buyerId}`)   
                    storage.setLocalStorageValue(registerInput, buyerId)
                    userProfileVar({
                        email: registerInput,
                        isAuth: true
                    })
                    let loginRequest = {
                        username: registerInput,
                        password: psswd,
                      };

                    // login here for private api jwt initial getDefaultBuyerAdress
                      jwt
                      .runTokenFlow(loginRequest)
                      .then(function (res) {
                        if (typeof res !== 'undefined') {
                          console.log(`login ok set auth`);
                          userProfileVar({
                            email: loginRequest.username,
                            isAuth: true,
                          });
            
                          let access_token = res.data.access_token;
                          if (access_token === 'undefined') {
                            console.log('no access token');
                          }
                          storage.setLocalStorageValue(
                            storage.LOCAL_STORAGE_TOKEN_KEY,
                            access_token
                          );
                          NavigationService.navigate('MainScreen');
                        }
                        // need check for status code = 200
                        // below is a mock for the expected jwt shpould be something like res.data.<some json token id>
                        else {
                          console.log('psswd is not correct');
                          toggleResetValidationAlert();
                        }
                      })
                      .catch(function (err) {
                        // here we will need to deal with a  status` code 401 and refresh jwt and try again
                      });

                    NavigationService.navigate('MainScreen') 
                   // NavigationService.navigate('OTPScreen', { fromScreen: 'RegisterScreen', phone: registerInput })
                }
            
            })
            .catch(err => {
                console.log("mutation error " + err)
                return
            });
    }

    /**  no validation here for rapid development */
    const onDebug = async() => {
        runRegisterBuyer()
    }

   /**
    * currently we are only using email @see VK
    * onRegister runs the runRegisterBuyer after much validation
    */
    const onRegister = async () => {
        // first decide are we an email or a phone
        let registerUserValidation = { name, lastName, registerInput, psswd }
        setValidationDisplay(``)
        console.log(`${name}::${lastName}::${registerInput}::${psswd}`)
        // here registerInput can be email not phone
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
                if (termsAccepted) {
                    setValidationDisplay(`Please accept terms and privacy policy`)
                    return
                }
                // for now use email only
                if (reporter.isEmail) {
                    await runRegisterBuyer()
                    resetValidation()

                } else {
                    // must be phone
                    setValidationDisplay(` please use email not phone`)
                }

            } else {
                setValidationDisplay(` phone or email is invalid`)
            }

        }// end else => no missing fields block

    }

    const resetValidation = () => {
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
                            onSwitch={() => {
                                console.log('termsAccepted=' + termsAccepted)
                                toggleTermsAccepted()
                                console.log('termsAccepted=' + termsAccepted)
                            }} />
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
                        onPress={onRegister}
                        // onPress={onDebug}
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
