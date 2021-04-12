/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 14:12:56
 * @LastEditTime: 2021-01-24 14:10:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserInfo/ListItem.js
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
/**
 * @description:tab menu item
 * @param {*} props
 * @return {*}
 */
function ListItem(props) {
  const { lefticon, text, righticon, onPress, hasline, leftStyle } = props;
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={[
          styles.item,
          { justifyContent: 'space-between' },
          hasline ? { borderBottomColor: 'gray', borderBottomWidth: 0.5 } : {},
        ]}
      >
        <View style={styles.item}>
          <Image style={[styles.itemicon,leftStyle]} source={lefticon} />
          <Text>{text}</Text>
        </View>
        <Image style={[styles.rightbtn, {}]} source={righticon} />
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
const styles = ScaledSheet.create({
  item: {
    height: '46@vs',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightbtn: {
    width: '40@s',
    height: '14@s',
    resizeMode: 'contain',
  },
  itemtext: {
    fontFamily: fonts.primary,
    fontSize: '12@s',
    color: '#292929',
  },
  itemicon: {
    width: '60@s',
    height: '36@s',
    resizeMode: 'contain',
  },
});
