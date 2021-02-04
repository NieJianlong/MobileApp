/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 17:53:05
 * @LastEditTime: 2021-01-24 14:08:19
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Horizontal Menu
 * @FilePath: /MobileApp/App/Containers/UserInfo/HorizontalMenu.js
 */
import React, { useState, useContext } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import colors from '../../Themes/Colors';
import DynamicTabView from './DynamicTabView';
import images from '../../Themes/Images';
import NoPurchase from './NoPurchase';
import TextTip from './TextTip';
import NavigationService from '../../Navigation/NavigationService';
import AppConfig from '../../Config/AppConfig';
import { Fonts } from '../../Themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import fonts from '../../Themes/Fonts';
import { Button, BottomSheet, Switch } from '../../Components';
import { SafeAreaView } from 'react-navigation';
import {
  AddressTestData,
  MenuConfig,
  PaymentTestData,
  BillDetail,
} from './Config';
import { AlertContext } from './index';

/**
 * @description: Tab menu, with animation effect
 * @param {*} props
 * @return {*}
 */
function HorizontalMenu(props) {
  // selected menu index
  const [defaultIndex, setDefaultIndex] = useState(0);
  // current address
  const [addresses, setAddresses] = useState([]);
  // current payments
  const [payments, setPayments] = useState([]);
  // my bill details
  const [billDetails, setBillDetails] = useState(null);
  const { dispatch } = useContext(AlertContext);
  const showSheet = () => {
    dispatch({
      type: 'showPaymentRemoveSheet',
      payload: { showSheet: true },
    });
  };

  return (
    <DynamicTabView
      data={MenuConfig}
      renderTab={(item, index) => {
        console.log('renderItem', index);
        let component = <NoPurchase />;
        switch (item.key) {
          case 'Purchasing':
            component = <NoPurchase {...item} />;
            break;
          case 'Addresses':
            if (addresses.length > 0) {
              component = flatListView(item, AddressTestData);
            } else {
              //component = flatListView(addresses);
              component = (
                <TextTip
                  {...item}
                  callback={() => {
                    setAddresses(AddressTestData);
                    dispatch({
                      type: 'changAlertState',
                      payload: {
                        visible: true,
                        message: 'New address added.',
                        color: colors.success,
                        title: 'Address Added',
                      },
                    });
                  }}
                ></TextTip>
              );
            }
            break;
          case 'Payment':
            if (payments.length > 0) {
              component = flatListView(item, PaymentTestData, true, showSheet);
            } else {
              component = (
                <TextTip
                  {...item}
                  callback={(item) => {
                    setPayments(PaymentTestData);
                    dispatch({
                      type: 'changAlertState',
                      payload: {
                        visible: true,
                        message: 'New payment method added..',
                        color: colors.success,
                        title: 'Success',
                      },
                    });
                  }}
                ></TextTip>
              );
            }

            break;
          case 'Billing':
            if (billDetails) {
              component = flatListView(item, Object.entries(BillDetail), false);
            } else {
              component = (
                <TextTip
                  {...item}
                  callback={() => {
                    setBillDetails(BillDetail);
                    dispatch({
                      type: 'changAlertState',
                      payload: {
                        visible: true,
                        message: 'Billing details added!',
                        color: colors.success,
                        title: 'Success',
                        rightButtonShow: true,
                      },
                    });
                  }}
                ></TextTip>
              );
            }

            break;

          default:
            break;
        }
        return component;
      }}
      defaultIndex={defaultIndex}
      containerStyle={styles.container}
      headerBackgroundColor={'white'}
      highlightStyle={{ color: 'white' }}
      noHighlightStyle={{ color: 'gray' }}
      headerTextStyle={styles.headerText}
      onChangeTab={(index) => {
        if (index != 4) {
          dispatch({
            type: 'rightButtonShow',
            payload: false,
          });
        } else {
          if (billDetails) {
            dispatch({
              type: 'rightButtonShow',
              payload: true,
            });
          }
        }
      }}
      headerUnderlayColor={'transparent'}
    />
  );
}
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
function flatListView(item, data, isPayment = false, showSheet = () => {}) {
  const {
    itemActions: { setDefault, doEdit, doDelete },
    key,
  } = item;


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        ListHeaderComponent={() => {
          if (key != 'Billing') {
            return null;
          } else {
            return (
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: AppConfig.paddingHorizontal,
                }}
              >
                <Switch label="Use the same info as my personal details"></Switch>
              </View>
            );
          }
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
              <View
                style={[
                  styles.item,
                  { height: vs(key == 'Billing' ? 65 : 122) },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {isPayment && (
                    <Image
                      style={styles.paytypeIcon}
                      source={images.userPayTypeImage}
                    ></Image>
                  )}
                  <Text style={styles.itemTitle}>
                    {key == 'Billing' ? item[0] : item.title}
                  </Text>
                  {item.isDefault && (
                    <Image style={styles.icon} source={images.check}></Image>
                  )}
                </View>
                <View>
                  <Text style={styles.itemSubTitle}>
                    {key == 'Billing' ? item[1] : item.subTitle}
                  </Text>
                  {/* {
                    isPayment&& <Text style={styles.itemSubTitle}>{item.expires}</Text>
                  } */}
                </View>
                {key != 'Billing' && (
                  <View style={styles.itemBottom}>
                    {item.isDefault ? (
                      <View style={styles.itemTipsContainer}>
                        <Text style={styles.itemTips}>
                          {isPayment
                            ? 'Default payment method'
                            : 'Default address'}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.itemSetDefault}
                        onPress={setDefault}
                      >
                        <Text style={styles.setDefaultText}>
                          SET AS DEFAULT
                        </Text>
                      </TouchableOpacity>
                    )}

                    <View style={{ flexDirection: 'row' }}>
                      {!isPayment && (
                        <TouchableOpacity onPress={(item) => doEdit(item)}>
                          <Image
                            style={styles.editImage}
                            source={images.userAddressEditImage}
                          />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        onPress={(item) => {
                          showSheet();
                        }}
                      >
                        <Image
                          style={styles.editImage}
                          source={images.userAddressTrashImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `listItem${index}`}
      />
      {key != 'Billing' && (
        <SafeAreaView
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            marginBottom: vs(20),
            marginTop: vs(20),
          }}
        >
          <Button text={item.extra} onPress={item.onPress}></Button>
        </SafeAreaView>
      )}
    </View>
  );
}
export default HorizontalMenu;

const styles = ScaledSheet.create({
  container: {
    height: '100@s',
    backgroundColor: colors.background,
  },
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
    fontFamily: Fonts.primary,
    color: colors.secondary00,
    fontWeight: '400',

    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  itemTitle: {
    fontSize: '14@s',
    fontFamily: Fonts.primary,
    color: colors.black,
    fontWeight: '600',
  },
  itemSubTitle: {
    fontSize: '14@s',
    fontFamily: Fonts.primary,
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
  },
});
