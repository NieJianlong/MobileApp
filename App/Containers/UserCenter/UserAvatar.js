/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 15:19:24
 * @LastEditTime: 2021-01-24 14:15:25
 * @LastEditors: Please set LastEditors
 * @Description: User Avatar
 * @FilePath: /MobileApp/App/Containers/UserCenter/UserAvatar.js
 */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScaledSheet, s, vs } from 'react-native-size-matters';

/**
 * @description:User avatar component
 * @param {*} props
 * @return {*}
 */
function UserAvatar(props) {
  const { uri } = props;
  return <Image style={styles.avatar} source={uri} />;
}

export default UserAvatar;
const styles = ScaledSheet.create({
  avatar: {
    width: '56@s',
    height: '56@s',
    borderRadius: '28@s',
  },
});
