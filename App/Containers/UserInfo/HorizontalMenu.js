/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 17:53:05
 * @LastEditTime: 2021-01-09 13:10:57
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Horizontal Menu
 * @FilePath: /MobileApp/App/Containers/UserInfo/HorizontalMenu.js
 */
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import {AppBar, Button} from '../../Components';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';
import DynamicTabView from './DynamicTabView';
import images from '../../Themes/Images';
import NoPurchase from './NoPurchase';

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
        color: 'blue',
      },
      {
        title: 'My Addresses',
        icon: images.userUAddressImage,
        selectedIcon: images.userAddressImage,
        key: 'item2',
        color: 'blue',
      },
      {
        title: 'My Payment Methods',
        icon: images.userUPayImage,
        selectedIcon: images.userPayImage,
        key: 'item3',
        color: 'blue',
      },
      {
        title: 'My Billing Details',
        icon: images.userUBillingImage,
        selectedIcon: images.userBillingImage,
        key: 'item4',
        color: 'yellow',
      },
    ];
  }

  _renderItem = (item, index) => {
    console.log('renderItem', index);
    return (
      <NoPurchase/>
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
  // `headerContainer: {
  //   marginTop: 16
  // },`
  headerText: {
    color: 'white',
  },
});
