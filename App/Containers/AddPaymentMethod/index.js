import React, {Component, useState, useEffect} from 'react';
import {View, StatusBar, Text,Image,Keyboard, TouchableOpacity} from 'react-native';
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
import images from '../../Themes/Images';
import { ScrollView } from 'react-native-gesture-handler';


function index(props) {
  

  const payments = [
    {
      image: images.userPayMethod2Image,
    },
    {
        image: images.userPayMethod1Image,
    },
    {
        image: images.userPayMethod3Image,
    },
    {
        image: images.userPayMethod4Image,
    },
    {   
        image: images.userPayMethod5Image,
    }
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
        <AppBar />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}>Add a payment method</Text>
          <ScrollView>
            {payments.map((item, index) => {
              return (
                <View style={{maxHeight:110}}>
                <TouchableOpacity>
                  <Image
                    source={item.image}
                    style={styles.item}
                  />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default index;
