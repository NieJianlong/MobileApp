import React, { useState } from 'react';
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

function index(props) {
  const [promoCode, setPromoCode] = useState('');
  const [summaries, setSummaries] = useState([
    {
      title: 'Subtotal product(s)',
      value: '$1.599,98',
      type: 'normal',
    },
    {
      title: 'Service fee',
      value: '$599,98',
      type: 'normal',
    },
    {
      title: 'Delivery',
      value: '$9,98',
      type: 'normal',
    },
    {
      title: 'Total savings',
      value: '-$809,98',
      type: 'normal',
    },
    {
      title: 'Total',
      value: '$847,57',
      type: 'bold',
    },
  ]);
  return (
    <View
      style={{
        paddingBottom: 50,
        paddingTop: 25,
      }}
    >
      <Text style={styles.title}>Order Summary</Text>
      <View
        style={{
          marginTop: vs(15),
          height: vs(48),
          borderRadius: s(40),
          borderWidth: 1,
          borderColor: '#DDDFE3',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          style={[
            ApplicationStyles.screen.txtRegular,
            {
              height: vs(48),
              paddingLeft: s(15),
              fontSize: s(14),
              color: colors.black,
              minWidth: s(200),
            },
          ]}
          onChangeText={(text) => setPromoCode(text)}
          //  value={promoCode}
          placeholder="Add a Promo Code"
        />
        {promoCode.length > 0 && (
          <TouchableOpacity
            style={{
              width: s(112),
              backgroundColor: colors.grey80,
              height: vs(48),
              borderRadius: s(40),
            }}
          >
            <Text
              style={[
                ApplicationStyles.screen.heading4Bold,
                {
                  color: 'white',

                  lineHeight: vs(48),
                  textAlign: 'center',
                },
              ]}
            >
              APPLY
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {summaries.map((item) => {
        return (
          <View
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
                },
              ]}
            >
              {item.value}
            </Text>
          </View>
        );
      })}
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            width: s(28),
            height: s(28),
            resizeMode: 'contain',
            marginRight: s(10),
          }}
          source={images.shopcartInfoImage}
        />
        <View>
          <Text
            style={[
              ApplicationStyles.screen.txtRegular,
              { color: colors.grey80 },
            ]}
          >
            Remember that you will get your product once the
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                ApplicationStyles.screen.txtRegular,
                { color: colors.grey80 },
              ]}
            >
              number of slices has been reached
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  ApplicationStyles.screen.txtRegular,
                  { color: colors.secondary00, paddingLeft: 6 },
                ]}
              >
                Learn more
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Switch
          onSwitch={() => {}}
          label="Use the same info as my personal details"
        ></Switch>
      </View>
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
});
