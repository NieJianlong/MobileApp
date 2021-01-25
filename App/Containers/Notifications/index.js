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

const invitedUsers = [
  {
    email: 'Notification Title',
    msg: 'Notification description',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
    readed: false,
  },
  {
    email: 'Notification Title',
    msg: 'Notification description',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
    readed: false,
  },
  {
    email: 'Notification Title',
    msg: 'Notification description',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
    readed: false,
  },
  {
    email: 'Notification Title',
    msg: 'Notification description',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
    readed: true,
  },
  {
    email: 'Notification Title',
    msg: 'Notification description',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
    readed: true,
  },
  {
    email: 'Notification Title',
    msg: 'Notification description',
    avatar: 'https://measure.3vyd.com/uPic/Grey 32.png',
    readed: true,
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
        <AppBar
          rightButton={() => (
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.update}>CLEAR ALL</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={invitedUsers}
          ListHeaderComponent={() => listHeader(setShowSheet)}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: AppConfig.paddingHorizontal,
                  marginTop: s(8),
                  opacity: item.readed ? 0.7 : 1,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor: item.readed
                            ? 'transparent'
                            : colors.primary,
                        },
                      ]}
                    ></View>
                    <Image
                      style={styles.shareIcon}
                      source={{
                        uri: 'https://measure.3vyd.com/uPic/iphone.png',
                      }}
                    ></Image>
                    <View style={{ marginLeft: 15 }}>
                      <Text style={[styles.balanceTxt, { fontSize: s(15) }]}>
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
                  <Text
                    style={[
                      styles.balanceTxt,
                      {
                        color: colors.grey60,
                        fontSize: s(14),
                      },
                    ]}
                  >
                    2h ago
                  </Text>
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
function listHeader(setShowSheet) {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.heading2Bold}>Notifications</Text>
      <Text style={[styles.heading4Regular, { color: Colors.grey80 }]}>
        {`You have 3 unread notifications`}
      </Text>
    </View>
  );
}

export default index;
