import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { vs } from 'react-native-size-matters';
import {
  AppBar,
  Button,
  TextInput,
  PasswordInput,
  Switch,
} from '../../Components';
import { Colors, Metrics } from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';

function index(props) {
  const [name, setName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [disable, setDisable] = useState(true);
  const [hastitle, setHasTitle] = useState(false);
  useEffect(() => {
    if (
      name.length == 0 ||
      cardNum.length == 0 ||
      date.length == 0 ||
      cvv.length == 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [name, cardNum, date, cvv]);

  const inputs = [
    {
      placeholder: 'Type your name on the card',
      onChangeText: (text) => setName(text),
      showError: false,
      errorMessage: null,
      weight: '12',
    },
    {
      placeholder: '000000000000000',
      onChangeText: (text) => setCardNum(text),
      showError: false,
      errorMessage: null,
      weight: '12',
    },
    {
      placeholder: 'MM/YY',
      onChangeText: (text) => setDate(text),
      showError: false,
      errorMessage: null,
      weight: '7',
    },
    {
      placeholder: 'CVV',
      onChangeText: (text) => setCvv(text),
      showError: false,
      errorMessage: null,
      weight: '4.5',
    },
  ];

  const {
    navigation: {
      state: { params },
    },
  } = props;
  // if (params.title=="EDIT ADDRESS") {
  //   setHasTitle(tru);
  // }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar
          rightButton={() => (
            <TouchableOpacity
              disabled={disable}
              onPress={() => {
                params.callback({
                  name,
                  cardNum,
                  date,
                  cvv,
                });
                NavigationService.goBack();
              }}
            >
              <Text style={disable ? styles.disupdate : styles.update}>
                SAVE
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Add your credit card details</Text>
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
                  style={{ width: `${(item.weight / 12) * 100}%` }}
                >
                  <TextInput style={{ marginTop: vs(18) }} {...item} />
                </View>
              );
            })}
          </View>
          <View style={{ marginTop: 20 }}>
            <Switch label="Set as default payment method"></Switch>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default index;
