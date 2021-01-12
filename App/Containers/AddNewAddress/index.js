import React, {Component, useState, useEffect} from 'react';
import {View, StatusBar, Text, Keyboard, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {vs} from 'react-native-size-matters';
import {
  AppBar,
  Button,
  TextInput,
  PasswordInput,
  Switch,
} from '../../Components';
import {Colors, Metrics} from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';

function index(props) {
  const [name, setName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNum, setStreetNum] = useState('');
  const [door, setDoor] = useState('');
  const [city, setCity] = useState('');
  const [mstate, setMstate] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (
      name.length == 0 ||
      streetName.length == 0 ||
      door.length == 0 ||
      city.length == 0 ||
      mstate.length == 0 ||
      pincode.length == 0 ||
      country.length == 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [name, streetName, streetNum, door, city, mstate, pincode, country]);
  const radioProps = {
    text: 'Set as default address',
    prefixIcon: images.userToggleOff,
    backgroundColor: 'transparent',
    textColor: colors.black,
  };
  const inputs = [
    {
      placeholder: 'Address Name (ex. home)*',
      onChangeText: (text) => setName(text),
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
      placeholder: 'Pincode*',
      onChangeText: (text) => setPincode(text),
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
  ];

  const {
    navigation: {
      state: {params},
    },
  } = props;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}>
        <AppBar
          rightButton={() => {
            return (
              <TouchableOpacity
                disabled={disable}
                onPress={() => {
                  params.callback({
                    name,
                    streetName,
                    streetNum,
                    door,
                    city,
                    mstate,
                    pincode,
                    country,
                  });
                  NavigationService.goBack();
                }}>
                <Text style={disable ? styles.disupdate : styles.update}>
                  SAVE
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Add new address</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {inputs.map((item, index) => {
              return (
                <View key={index} style={{width: item.type == 'short' ? '48%' : '100%'}}>
                  <TextInput
                    
                    style={{marginTop: vs(18)}}
                    {...item}
                  />
                </View>
              );
            })}
          </View>
          <View style={{marginTop: 20}}>
            <Switch label="Set as default address"></Switch>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default index;
