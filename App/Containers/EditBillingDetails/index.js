import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vs, s } from 'react-native-size-matters';
import {
  AppBar,
  Button,
  TextInput,
  Switch,
  RightButton,
} from '../../Components';
import { ApplicationStyles, Metrics } from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import AppConfig from '../../Config/AppConfig';
import metrics from '../../Themes/Metrics';

/**
 * @description: Edit Billing detail Screen
 * @param {*} props
 * @return {*}
 */
function EditBillingDetails(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneOrEmailNum, setPhoneOrEmailNum] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNum, setStreetNum] = useState('');
  const [door, setDoor] = useState('');
  const [city, setCity] = useState('');
  const [mstate, setMstate] = useState('');
  const [postcode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [taxid, setTaxid] = useState('');
  // const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      phoneOrEmailNum.length === 0 ||
      streetName.length === 0 ||
      streetNum.length === 0 ||
      door.length === 0 ||
      city.length === 0 ||
      mstate.length === 0 ||
      postcode.length === 0 ||
      country.length === 0 ||
      company.length === 0 ||
      taxid.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    firstName,
    lastName,
    phoneOrEmailNum,
    streetName,
    streetNum,
    door,
    city,
    mstate,
    postcode,
    country,
    company,
    taxid,
  ]);
  const inputs = [
    {
      placeholder: 'First Name*',
      onChangeText: (text) => setFirstName(text),
      showError: false,
      errorMessage: null,
      type: 'normal',
    },
    {
      placeholder: 'Last Name*',
      onChangeText: (text) => setLastName(text),
      showError: false,
      errorMessage: null,
      type: 'normal',
    },
    {
      placeholder: 'Email *',
      onChangeText: (text) => setPhoneOrEmailNum(text),
      showError: false,
      errorMessage: null,
      type: 'normal',
    },
    {
      placeholder: 'Phone number *',
      onChangeText: (text) => setPhoneOrEmailNum(text),
      showError: false,
      errorMessage: null,
      type: 'normal',
    },

    {
      placeholder: 'Street Name*',
      onChangeText: (text) => setStreetName(text),
      showError: false,
      errorMessage: null,
      type: 'normal',
    },
    {
      placeholder: 'Street Number*',
      onChangeText: (text) => setStreetNum(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'Flat, Floor, Door',
      onChangeText: (text) => setDoor(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'City*',
      onChangeText: (text) => setCity(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'State*',
      onChangeText: (text) => setMstate(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'Postcode*',
      onChangeText: (text) => setPostCode(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'Country*',
      onChangeText: (text) => setCountry(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'Company name',
      onChangeText: (text) => setCompany(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
    {
      placeholder: 'TAX ID',
      onChangeText: (text) => setTaxid(text),
      showError: false,
      errorMessage: null,
      type: 'short',
    },
  ];

  const {
    navigation: {
      state: { params },
    },
  } = props;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar
          rightButton={() => (
            <RightButton
              title="SAVE"
              disable={disable}
              onPress={() => {
                if (typeof params.saveCallback === 'function') {
                  params.saveCallback({});
                }

                NavigationService.goBack();
              }}
            />
          )}
        />
        <KeyboardAwareScrollView
          keyboardVerticalOffset={50}
          style={{ height: metrics.screenHeight - 100, paddingBottom: 100 }}
          enabled
        >
          <View style={styles.bodyContainer}>
            <Text style={[styles.heading2Bold, { fontSize: s(22) }]}>
              1 Click Purchasing preference
            </Text>
            <View style={{ marginTop: 20 }}>
              <Switch label="Use the same info as my personal details"></Switch>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {inputs.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{ width: item.type == 'short' ? '48%' : '100%' }}
                  >
                    <TextInput style={{ marginTop: vs(18) }} {...item} />
                  </View>
                );
              })}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 0,
            left: 0,
            paddingHorizontal: AppConfig.paddingHorizontal,
          }}
        >
          <Button
            onPress={() => {
              if (params) {
                if (typeof params.removeCallback == 'function') {
                  params.removeCallback();
                }
              }
            }}
            textColor={colors.grey80}
            text="REMOVE BILLING DETAILS"
            backgroundColor="transparent"
          ></Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default EditBillingDetails;
