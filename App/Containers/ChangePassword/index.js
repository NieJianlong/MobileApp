import React, {Component, useState, useEffect} from 'react';
import {View, StatusBar, Text, Keyboard,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {vs} from 'react-native-size-matters';
import {AppBar, Button, TextInput, PasswordInput} from '../../Components';
import {Colors} from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';

function index(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputs = [
    {
      placeholder: 'Enter your Current Password',
      onChangeText: (text) => setPassword(text),
      showError: false,
      errorMessage: null,
    },
    {
      placeholder: 'Enter your New Password',
      onChangeText: (text) => setNewPassword(text),
      showError: false,
      errorMessage: null,
    },
    {
      placeholder: 'Repeat your New Password',
      onChangeText: (text) => setConfirmPassword(text),
      showError: false,
      errorMessage: 'Password does not match',
    },
  ];

  useEffect(() => {
    const keyboardShow = (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    };
    const keyboardHide = (e) => {
      setKeyboardHeight(0);
    };
    Keyboard.addListener('keyboardWillShow', keyboardShow);
    Keyboard.addListener('keyboardWillHide', keyboardHide);
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardShow);
      Keyboard.removeListener('keyboardWillHide', keyboardHide);
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}>
        <AppBar rightButton={()=>{
            return (
               <TouchableOpacity onPress={()=>alert('success')}>
                   <Text style={styles.update}>
                       UPDATE
                   </Text>
               </TouchableOpacity> 
            );
        }}/>
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Change my password</Text>
          <Text style={[styles.heading4Regular, {color: Colors.grey80}]}>
            For security reasons please first enter your current password.
          </Text>

          <View>
            {inputs.map((item, index) => {
              return (
                <PasswordInput
                  key={index}
                  style={{marginTop: vs(18)}}
                  {...item}
                />
              );
            })}
          </View>

          <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <Button
              backgroundColor="transparent"
              textColor={colors.grey80}
              onPress={() => {
                NavigationService.navigate('');
              }}
              text={'I DON’T REMEMBER MY PASSWORD'}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default index;
