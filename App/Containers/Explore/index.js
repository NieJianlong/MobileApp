import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import { vs, s } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    Button,
    BottomSheet,
    LocationSearchBox,
    TextInput,
    Alert,
    RadiusButton
} from '../../Components'

import { Colors, Images } from '../../Themes'
import styles from './styles'

class ExploreScreen extends Component {

    fall = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.state = {
            showLocationSheet: false,
            showAddLocationSheet: false,
            showAddAddressSheet: false,
            showAccountActivatedSuccessfullyAlert: false,
            showAccountActivateAlert: false
        }
    }

    componentDidMount() {

    }

    toggleAddressSheet = () => {
        this.setState({ showLocationSheet: !this.state.showLocationSheet }, () => {
            if (this.state.showLocationSheet) {
                this.addressSheet.snapTo(0)
            } else {
                this.addressSheet.snapTo(1)
            }
        })
    }

    toggleAddLocationSheet = () => {
        this.setState({ showAddLocationSheet: !this.state.showAddLocationSheet }, () => {
            if (this.state.showAddLocationSheet) {
                this.addLocationSheet.snapTo(0)
            } else {
                this.addLocationSheet.snapTo(1)
            }
        })
    }

    toggleAddAddressSheet = () => {
        this.setState({ showAddAddressSheet: !this.state.showAddAddressSheet }, () => {
            if (this.state.showAddAddressSheet) {
                this.addAddressSheet.snapTo(0)
            } else {
                this.addAddressSheet.snapTo(1)
            }
        })
    }

    toggleAccountActivatedSuccessfullyAlert = () => {
        if (this.state.showAccountActivatedSuccessfullyAlert) {
            setTimeout(() => {
                this.setState({ showAccountActivatedSuccessfullyAlert: false })
            }, 2100)
        } else {
            this.setState({ showAccountActivatedSuccessfullyAlert: true })
        }
    }

    toggleActivateAccountAlert = () => {

    }

    renderAddressSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addressSheet = ref
                }}
                onCloseEnd={() => this.setState({ showLocationSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(190), 0]}
                initialSnap={this.state.showLocationSheet ? 0 : 1}
                title={'Add your delivery address'}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        backgroundColor={Colors.grey80}
                        onPress={() => {
                            this.toggleAddressSheet()
                            this.toggleAddAddressSheet()
                        }}
                        prefixIcon={Images.location}
                        text={'CURRENT LOCATION'} />

                    <View style={{ height: vs(12) }} />

                    <Button
                        backgroundColor={Colors.grey80}
                        prefixIcon={Images.add1}
                        onPress={() => {
                            this.toggleAddressSheet()
                            this.toggleAddLocationSheet()
                        }}
                        text={'ADD ADDRESS'} />
                </View>
            </BottomSheet>
        )
    }

    renderAddLocationSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addLocationSheet = ref
                }}
                onCloseEnd={() => this.setState({ showAddLocationSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(600), 0]}
                initialSnap={this.state.showAddLocationSheet ? 0 : 1}
                title={'Add your location'}>
                <View style={{ flex: 1 }}>
                    <LocationSearchBox
                        onPressAddAddressManually={() => {
                            this.toggleAddLocationSheet()
                            this.toggleAddAddressSheet()
                        }}
                    />
                </View>
            </BottomSheet>
        )
    }

    renderAddAddressSheet() {
        return (
            <BottomSheet
                customRef={ref => {
                    this.addAddressSheet = ref
                }}
                onCloseEnd={() => this.setState({ showAddAddressSheet: false })}
                callbackNode={this.fall}
                snapPoints={[vs(600), 0]}
                initialSnap={this.state.showAddAddressSheet ? 0 : 1}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.popupHeader}>
                        <Text style={[styles.txtSave, { color: 'transparent' }]}>SAVE</Text>
                        <Text style={styles.popupTitle}>Add your delivery address</Text>
                        <TouchableOpacity>
                            <Text style={styles.txtSave}>SAVE</Text>
                        </TouchableOpacity>
                    </View>

                    <KeyboardAwareScrollView>
                        <TextInput
                            placeholder={'Pin Code'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'State (Province)'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Town or city'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Village or area'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'House number'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Flat number'}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder={'Landmark'}
                            style={styles.textInput}
                        />
                    </KeyboardAwareScrollView>

                </View>
            </BottomSheet>
        )
    }

    renderAccountActivatedSuccessfullyAlert() {
        return (
            <Alert
                visible={this.state.showAccountActivatedSuccessfullyAlert}
                message={'Your account has been activated successfully'}
                color={Colors.success}
                onDismiss={this.toggleAccountActivatedSuccessfullyAlert}
            />
        )
    }

    renderActivateAccountAlert() {
        return (
            <Alert
                visible={this.state.showAccountActivateAlert}
                title={'Activate First'}
                message={'You\'ve successfully registered your account. Please check your email for the activation link so can make full use of your account.'}
                color={Colors.secondary00}
                onDismiss={this.toggleActivateAccountAlert}
                action={() =>
                    <View style={{width: s(120)}}>
                        <RadiusButton text={'RESEND EMAIL'} />
                    </View>
                }
            />
        )
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.icSearch} />

                <Image source={Images.logo3} style={styles.logo} resizeMode={'contain'} />

                <TouchableOpacity onPress={this.toggleAddressSheet}>
                    <Image source={Images.search} style={styles.icSearch} />
                </TouchableOpacity>
            </View>
        )
    }

    renderBody() {
        return (
            <View>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />

                <SafeAreaView
                    style={styles.mainContainer}
                    edges={['bottom', 'top', 'left', 'right']}>

                    {this.renderHeader()}

                    {this.renderBody()}

                </SafeAreaView>

                {this.renderAddressSheet()}

                {this.renderAddLocationSheet()}

                {this.renderAddAddressSheet()}

                {/* background for bottom sheet */}
                {
                    (this.state.showLocationSheet || this.state.showAddLocationSheet || this.state.showAddAddressSheet) &&
                    <TouchableWithoutFeedback
                        onPress={() => {

                        }}>
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                alignItems: 'center',
                                backgroundColor: 'rgb(29,29,29)',
                                opacity: Animated.add(0.85, Animated.multiply(-1.0, this.fall)),
                            }}
                        />
                    </TouchableWithoutFeedback>
                }

                {this.renderAccountActivatedSuccessfullyAlert()}

                {this.renderActivateAccountAlert()}
            </View>
        )
    }
}

export default ExploreScreen