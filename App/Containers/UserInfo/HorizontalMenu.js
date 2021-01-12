/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 17:53:05
 * @LastEditTime: 2021-01-12 23:00:52
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Horizontal Menu
 * @FilePath: /MobileApp/App/Containers/UserInfo/HorizontalMenu.js
 */
import React, {useState} from 'react';
import {View, FlatList, Text, Image} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import colors from '../../Themes/Colors';
import DynamicTabView from './DynamicTabView';
import images from '../../Themes/Images';
import NoPurchase from './NoPurchase';
import TextTip from './TextTip';
import NavigationService from '../../Navigation/NavigationService';
import AppConfig from '../../Config/AppConfig';
import {Fonts} from '../../Themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fonts from '../../Themes/Fonts';
import {Button} from '../../Components';
import {SafeAreaView} from 'react-navigation';

const testData = [
  {
    title: 'Home',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: true,
  },
  {
    title: 'Work',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: false,
  },
  {
    title: 'Home',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: true,
  },
  {
    title: 'Work',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: false,
  },
];

function HorizontalMenu(props) {
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [addresses, setAddresses] = useState([{}, {}]);
  const data = [
    {
      title: '1 Click Purchasing',
      icon: images.userPurchaseImage,
      selectedIcon: images.userPurchaseImage,
      screen: NoPurchase,
      key: 'Purchasing',
    },
    {
      title: 'My Addresses',
      icon: images.userUAddressImage,
      selectedIcon: images.userAddressImage,
      key: 'Addresses',
      textTip: 'Your address list is empty',
      subTextTip: 'You haven´t add any personal address yet',
      needButton: true,
      btnMsg: 'ADD ADDRESS',
      onPress: () => {
        NavigationService.navigate('AddNewAddressScreen', {
          callback: (address) => {
            setAddresses([address]);
          },
        });
      },
    },
    {
      title: 'My Payment Methods',
      icon: images.userUPayImage,
      selectedIcon: images.userPayImage,
      key: 'Payment',
      textTip: "You haven't added any payment \n method yet",
      subTextTip:
        'Add a payment method to be able to use it in your next  purchases',
      needButton: true,
      btnMsg: 'ADD  NEW PAYMENT METHOD',
      onPress: () => {},
    },
    {
      title: 'My Billing Details',
      icon: images.userUBillingImage,
      selectedIcon: images.userBillingImage,
      key: 'Billing',
      textTip: 'You have not added \n billing details yet',
      subTextTip: 'Add your billing details to use in your next purchase',
      needButton: true,
      btnMsg: 'ADD BILLING DETAILS',
      onPress: () => {},
    },
  ];
  return (
    <DynamicTabView
      data={data}
      renderTab={(item, index) => {
        console.log('renderItem', index);
        let component = <NoPurchase />;
        switch (item.key) {
          case 'Purchasing':
            component = <NoPurchase />;
            break;
          case 'Addresses':
            if (addresses.length > 0) {
              component = flatListView(addresses);
            } else {
              component = flatListView(addresses);
              //<TextTip {...item}></TextTip>;
            }
            break;
          case 'Payment':
            component = <TextTip {...item}></TextTip>;
            break;
          case 'Billing':
            component = <TextTip {...item}></TextTip>;
            break;

          default:
            break;
        }
        return component;
      }}
      defaultIndex={defaultIndex}
      containerStyle={styles.container}
      headerBackgroundColor={'white'}
      highlightStyle={{color: 'white'}}
      noHighlightStyle={{color: 'gray'}}
      headerTextStyle={styles.headerText}
      // onChangeTab={this.onChangeTab}
      headerUnderlayColor={'transparent'}
    />
  );
}

function flatListView(data) {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={testData}
        renderItem={({item}) => {
          return (
            <View style={{paddingHorizontal: AppConfig.paddingHorizontal}}>
              <View style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.isDefault && (
                    <Image style={styles.icon} source={images.check}></Image>
                  )}
                </View>
                <View>
                  <Text style={styles.itemSubTitle}>{item.subTitle}</Text>
                </View>

                <View style={styles.itemBottom}>
                  {item.isDefault ? (
                    <View style={styles.itemTipsContainer}>
                      <Text style={styles.itemTips}>Default address</Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.itemSetDefault}>
                      <Text style={styles.setDefaultText}>SET AS DEFAULT</Text>
                    </TouchableOpacity>
                  )}

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                      <Image
                        style={styles.editImage}
                        source={images.userAddressEditImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={styles.editImage}
                        source={images.userAddressTrashImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <SafeAreaView
        style={{
          paddingHorizontal: AppConfig.paddingHorizontal,
          marginBottom: vs(20),
          marginTop: vs(20),
        }}>
        <Button text="ADD NEW ADDRESS"></Button>
      </SafeAreaView>
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

    width: '96@s',
    height: '24@vs',
    backgroundColor: colors.secondary01,
    borderRadius: '12@s',
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
    width: '96@s',
    height: '24@vs',
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
    height: '128@vs',
    padding: AppConfig.paddingHorizontal,
  },
});
