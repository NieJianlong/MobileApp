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
