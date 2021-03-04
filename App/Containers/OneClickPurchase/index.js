import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import { AppBar, Button, Switch } from '../../Components';
import styles from './styles';
import NavigationService from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';
import AppConfig from '../../Config/AppConfig';
import metrics from '../../Themes/Metrics';
import fonts from '../../Themes/Fonts';
import { PaymentTestData } from '../UserInfo/Config';
import { set } from 'react-native-reanimated';
import { ApplicationStyles } from '../../Themes';
/**
 * @description: 1 Click purchase Screen
 * @param {*} props
 * @return {*}
 */
function index(props) {
  const {
    navigation: {
      state: { params },
    },
  } = props;
  const [selectIndex, setSelectIndex] = useState(999);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar
          rightButton={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate('SelectDeliveryAddressScreen');
                }}
              >
                <Text style={[ApplicationStyles.screen.heading5Bold]}>
                  SAVE
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.bodyContainer}>
          <Text style={[styles.heading2Bold, { fontSize: s(22) }]}>
            1 Click Purchasing preference
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: colors.grey80,
                fontSize: s(14),
                fontFamily: fonts.primary,
              }}
            >{`This is an explanatory text on how this functionality works`}</Text>
          </View>
          <Text
            style={[
              styles.heading2Bold,
              { fontSize: s(18), marginVertical: AppConfig.paddingHorizontal },
            ]}
          >
            Select a default payment method
          </Text>
          <FlatList
            data={PaymentTestData}
            style={{ height: metrics.screenHeight - vs(300) }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => setSelectIndex(index)}>
                  <View
                    style={[
                      styles1.item,
                      { borderWidth: index == selectIndex ? 2 : 0 },
                    ]}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        style={styles1.paytypeIcon}
                        source={images.userPayTypeImage}
                      ></Image>
                      <Text style={styles1.itemTitle}>{item.title}</Text>
                      {item.isDefault && (
                        <Image
                          style={styles1.icon}
                          source={images.check}
                        ></Image>
                      )}
                    </View>
                    <View>
                      <Text style={styles1.itemSubTitle}>{item.subTitle}</Text>
                    </View>
                    <View style={styles1.itemBottom}>
                      {item.isDefault ? (
                        <View style={styles1.itemTipsContainer}>
                          <Text style={styles1.itemTips}>
                            Default payment method
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles1.itemSetDefault}>
                          <Text style={styles1.setDefaultText}>
                            SET AS DEFAULT
                          </Text>
                        </TouchableOpacity>
                      )}

                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={(item) => {
                            showSheet();
                          }}
                        >
                          <Image
                            style={styles1.editImage}
                            source={images.userAddressTrashImage}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => `listItem${index}`}
          />
        </View>
        <SafeAreaView
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
            textColor="white"
            text="ADD  NEW PAYMENT METHOD"
            backgroundColor={colors.grey80}
          ></Button>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

export default index;
const styles1 = ScaledSheet.create({
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTipsContainer: {
    marginTop: '5@vs',
    backgroundColor: colors.secondary01,
    borderRadius: '12@s',
    paddingHorizontal: '10@s',
  },
  setDefaultText: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    fontWeight: '600',
    color: colors.secondary00,
  },
  itemSetDefault: {
    marginTop: '12@vs',

    height: '24@vs',
    borderRadius: '12@s',
  },
  itemTips: {
    fontSize: '12@s',
    fontFamily: fonts.primary,
    color: colors.secondary00,
    fontWeight: '400',

    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  credit: {
    width: '100%',
    maxHeight: '80@vs',
    resizeMode: 'contain',
    marginVertical: '25@vs',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  itemTitle: {
    fontSize: '14@s',
    fontFamily: fonts.primary,
    color: colors.black,
    fontWeight: '600',
  },
  itemSubTitle: {
    fontSize: '14@s',
    fontFamily: fonts.primary,
    color: colors.grey80,
  },
  paytypeIcon: {
    width: '26@s',
    height: '26@s',
    resizeMode: 'contain',
  },
  icon: {
    width: '20@s',
    height: '20@s',
    marginLeft: '12@s',
    resizeMode: 'contain',
  },
  editImage: {
    width: '24@s',
    height: '24@s',
    marginLeft: '12@s',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: 'white',
  },
  item: {
    marginTop: '15@vs',
    backgroundColor: colors.white,
    borderRadius: '16@s',
    height: '122@vs',
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: 'center',
    borderColor: '#409AEF',
  },
});
