import React, { useRef, useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vs, s } from 'react-native-size-matters';
import { AppBar, Button, BottomSheet } from '../../Components';
import { Colors } from '../../Themes';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import AppConfig from '../../Config/AppConfig';
import TextTip from '../UserInfo/TextTip';
import metrics from '../../Themes/Metrics';

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
  fall = new Animated.Value(0);
  const [showSheet, setShowSheet] = useState(false);
  const sheetEl = useRef(null);
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
          ListHeaderComponent={() => listHeader(setShowSheet)}
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
        {showSheet && (
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={{
                width: metrics.screenWidth,
                height: metrics.screenHeight,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                backgroundColor: 'rgb(29,29,29)',
                opacity: Animated.add(0.85, Animated.multiply(-1.0, fall)),
              }}
            />
          </TouchableWithoutFeedback>
        )}
        {showSheet && renderSheet(sheetEl,setShowSheet)}
      </SafeAreaView>
    </View>
  );
}
function listHeader(setShowSheet) {
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
            <TouchableOpacity onPress={() => setShowSheet(true)}>
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
/**
 * @description: action sheet,like remove payment method
 * @param {*} sheetEl
 * @param {*} dispatch
 * @return {*}
 */
function renderSheet(sheetEl,setShowSheet) {
  const tips = {
    textTip: 'About Salami Credit',
    subTextTip:
      'When a new user applies your unique code, they get a promotion for their first order. After they apply you code and place their first order, you will earn a promotion for future use.',
    needButton: true,
    btnMsg: 'OK',
    onPress: () => {
      setShowSheet(false);
    },
    callback: () => {},
  };
  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        customRef={sheetEl}
        onCloseEnd={() => {}}
        // callbackNode={new Animated.Value(0)}
        snapPoints={[vs(260), 0]}
        initialSnap={0}
        // title={'Add your delivery address'}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
          }}
        >
          <View style={{ flex: 1, marginLeft: s(-15) }}>
            <TextTip {...tips}></TextTip>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
export default index;
