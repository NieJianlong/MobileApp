/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 17:53:05
 * @LastEditTime: 2021-01-09 20:03:14
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Horizontal Menu
 * @FilePath: /MobileApp/App/Containers/UserInfo/HorizontalMenu.js
 */
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import colors from '../../Themes/Colors';
import DynamicTabView from './DynamicTabView';
import images from '../../Themes/Images';
import NoPurchase from './NoPurchase';
import TextTip from './TextTip';

class HorizontalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultIndex: 0,
    };
    this.data = [
      {
        title: '1 Click Purchasing',
        icon: images.userPurchaseImage,
        selectedIcon: images.userPurchaseImage,
        screen:NoPurchase,
        key: 'item1',
    
      },
      {
        title: 'My Addresses',
        icon: images.userUAddressImage,
        selectedIcon: images.userAddressImage,
        key: 'item2',
        textTip:"Your address list is empty",
        subTextTip:"You haven´t add any personal address yet",
        needButton: true,
        btnMsg: 'ADD ADDRESS',
        onPress:()=>{}
      },
      {
        title: 'My Payment Methods',
        icon: images.userUPayImage,
        selectedIcon: images.userPayImage,
        key: 'item3',
        textTip:"You haven't added any payment \n method yet",
        subTextTip:"Add a payment method to be able to use it in your next  purchases",
        needButton: true,
        btnMsg: 'ADD  NEW PAYMENT METHOD',
        onPress:()=>{}

      },
      {
        title: 'My Billing Details',
        icon: images.userUBillingImage,
        selectedIcon: images.userBillingImage,
        key: 'item4',
        textTip:"You have not added \n billing details yet",
        subTextTip:"Add your billing details to use in your next purchase",
        needButton: true,
        btnMsg: 'ADD BILLING DETAILS',
        onPress:()=>{}
      },
    ];
  }

  _renderItem = (item, index) => {
    console.log('renderItem', index);
    if (item.key=='item1') {
      return <NoPurchase></NoPurchase>;
    }
    return (
      <TextTip {...item}></TextTip>
    );
  };

  render() {
    return (
      <DynamicTabView
        data={this.data}
        renderTab={this._renderItem}
        defaultIndex={this.state.defaultIndex}
        containerStyle={styles.container}
        headerBackgroundColor={'white'}
        highlightStyle={{color:'white'}}
        noHighlightStyle={{color:'gray'}}
        headerTextStyle={styles.headerText}
        onChangeTab={this.onChangeTab}
        headerUnderlayColor={'transparent'}
      />
    );
  }
}

export default HorizontalMenu;
const styles = ScaledSheet.create({
  container: {
    height: '100@s',
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: 'white',
  },
});
