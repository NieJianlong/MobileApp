import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import colors from '../../../Themes/Colors';
import { AppBar, Button, Switch } from '../../../Components';

import images from '../../../Themes/Images';
import { ApplicationStyles } from '../../../Themes';
import AppConfig from '../../../Config/AppConfig';

function index(props) {
  const [summaries, setSummaries] = useState([
    {
      title: 'Subtotal',
      value: '$39,98',
      type: 'normal',
    },
    {
      title: 'Shipping',
      value: '$0.00',
      type: 'normal',
    },

    {
      title: 'Total',
      value: '$39.99',
      type: 'bold',
    },
  ]);
  return (
    <View
      style={{
        paddingBottom: 50,
        paddingTop: 25,
        paddingHorizontal: AppConfig.paddingHorizontal,
      }}
    >
      <Text style={styles.title}>Refund summary</Text>
      {summaries.map((item, index) => {
        return (
          <View
            key={`footer${index}`}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  color: item.type == 'normal' ? colors.grey80 : colors.black,
                  fontWeight: item.type == 'normal' ? 'normal' : '600',
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.title,
                {
                  color: item.type == 'normal' ? colors.grey80 : colors.black,
                  fontWeight: item.type == 'normal' ? 'normal' : '600',
                },
              ]}
            >
              {item.value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
  promoCode: {
    marginTop: vs(15),
    height: vs(48),
    borderRadius: s(40),
    borderWidth: 1,
    borderColor: '#DDDFE3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoCodeFailure: {
    marginTop: vs(15),
    height: vs(48),
    borderRadius: s(40),
    borderWidth: 1,
    borderColor: '#E42526',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoInput: {
    height: vs(48),
    paddingLeft: s(15),
    fontSize: s(14),
    color: colors.black,
    minWidth: s(200),
  },
  promoInputSuccess: {
    height: vs(48),
    paddingLeft: s(15),
    fontSize: s(14),
    color: colors.white,
    minWidth: s(200),
  },
  promoInputFailure: {
    height: vs(48),
    paddingLeft: s(15),
    fontSize: s(14),
    color: '#E42526',
    minWidth: s(200),
  },
  promoSuccess: {
    marginTop: vs(15),
    height: vs(48),
    borderRadius: s(40),
    // borderWidth: 1,
    // borderColor: '#DDDFE3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.success,
  },
});
