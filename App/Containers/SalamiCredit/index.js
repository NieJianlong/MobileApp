import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { vs, s } from 'react-native-size-matters';
import { AppBar, Button, TextInput, PasswordInput } from '../../Components';
import { Colors } from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import AppConfig from '../../Config/AppConfig';
const shareIcons = [
  { src: images.userShareIcon1Image, onPress: () => {} },
  { src: images.userShareIcon2Image, onPress: () => {} },
  { src: images.userShareIcon3Image, onPress: () => {} },
  { src: images.userShareIcon4Image, onPress: () => {} },
  { src: images.userShareIcon5Image, onPress: () => {} },
  { src: images.userShareIcon6Image, onPress: () => {} },
];
const invitedUsers = [
  {
    email: 'usernme.lastname@mail.com',
    msg: 'hasn’t registered yet',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
  },
  {
    email: 'usernme.lastname@mail.com',
    msg: 'hasn’t registered yet',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
  },
];

function index(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar />
        <FlatList
          data={invitedUsers}
          ListHeaderComponent={() => listHeader()}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
                <View
                  style={{
                    flexDirection: 'row',

                    borderBottomWidth: 0.2,
                    borderBottomColor: colors.grey80,
                  }}
                >
                  <Image
                    style={styles.shareIcon}
                    source={{
                      uri: 'https://measure.3vyd.com/uPic/uuuuuuuno.png',
                    }}
                  ></Image>
                  <View style={{ marginLeft: 15 }}>
                    <Text style={[styles.balanceTxt, { fontSize: s(14) }]}>
                      {item.email}
                    </Text>
                    <Text
                      style={[
                        styles.balanceTxt,
                        { color: colors.grey60, fontSize: s(14) },
                      ]}
                    >
                      {item.msg}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => `list${index}`}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
}
function listHeader(params) {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.heading2Bold}>Salami Credit</Text>
      <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
        {`You can use your credit for future purchases`}
      </Text>

      <View style={styles.tipContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTipTxt}>BALANCE</Text>
          <Text style={styles.balanceTxt}>$20.00</Text>
          <Text style={styles.useBalanceTxt}>USE CREDIT NOW</Text>
        </View>
      </View>
      <View style={styles.tipContainer}>
        <View style={styles.content}>
          <Text style={[styles.balanceTipTxt, { fontSize: s(16) }]}>
            Share your link
          </Text>
          <Text style={[styles.balanceTxt, { fontSize: s(32) }]}>
            salami-bsik9k
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(15),
                color: colors.grey60,
                textAlign: 'center',
              },
            ]}
          >
            {`Share your code with a friend. When they use it for`}
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(15),
                color: colors.grey60,
                textAlign: 'center',
              },
            ]}
          >
            their first Salami order, you both get $10 off a $25
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={[
                styles.balanceTipTxt,
                {
                  fontSize: s(15),
                  color: colors.grey60,
                  textAlign: 'center',
                },
              ]}
            >
              order.
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.balanceTipTxt,
                  {
                    fontSize: s(15),
                    color: colors.secondary00,
                    textAlign: 'center',
                  },
                ]}
              >
                Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          {shareIcons.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => item.onPress()}>
                <Image source={item.src} style={styles.shareIcon}></Image>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={{ marginTop: vs(50) }}>
        <Text style={[styles.heading2Bold, { fontSize: s(15) }]}>
          Pending invitations
        </Text>
      </View>
    </View>
  );
}
export default index;
