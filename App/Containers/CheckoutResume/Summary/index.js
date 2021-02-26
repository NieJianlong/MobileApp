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

import fonts from '../../../Themes/Fonts';
import images from '../../../Themes/Images';
import { ApplicationStyles } from '../../../Themes'; 

function index(props) {
  const { orderStatus } = props;
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState('');
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
  useEffect(() => {
    if (promoStatus == 'success') {
      setPromoCode('10% Discount applied successfully!');
    }
  }, [promoStatus]);
  return (
    <View
      style={{
        paddingBottom: 50,
        paddingTop: 25,
      }}
    >
      <Text style={styles.title}>Order Summary</Text>
      {orderStatus != 1 && (
        <View
          style={
            promoStatus == 'success'
              ? styles.promoSuccess
              : promoStatus == 'failure'
              ? styles.promoCodeFailure
              : styles.promoCode
          }
        >
          <TextInput
            editable={promoStatus != 'success'}
            onFocus={() => {
              setPromoStatus('');
            }}
            style={[
              ApplicationStyles.screen.txtRegular,
              promoStatus == 'success'
                ? styles.promoInputSuccess
                : promoStatus == 'failure'
                ? styles.promoInputFailure
                : styles.promoInput,
            ]}
            onChangeText={(text) => setPromoCode(text)}
            value={promoCode}
            placeholder="Add a Promo Code"
          />
          {promoCode.length > 0 && promoStatus != 'success' && (
            <TouchableOpacity
              onPress={() => {
                if (promoCode == '1111') {
                  setPromoStatus('success');
                } else {
                  setPromoStatus('failure');
                }
              }}
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
      )}

      {promoStatus == 'failure' && (
        <Text
          style={
            (ApplicationStyles.screen.heading6Bold,
            {
              margin: s(15),
              marginVertical: s(8),
              color: colors.error,
            })
          }
        >
          Error Message
        </Text>
      )}
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
      {orderStatus != 1 && (
        <View>
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
      )}
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
