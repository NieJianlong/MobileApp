import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput as RNTextInput,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar, Selector } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';

import SelectPrefer from './SelectPrefer';
import { ApplicationStyles } from '../../Themes';

function ReturnProductStep1(props) {
  const [showPrefer, setShowPrefer] = useState(false);
  const [prefer, setPrefer] = useState('Return the product and get a refund');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
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
                  if (prefer == 'Return the product and get a refund') {
                    NavigationService.navigate('RefundScreen', {
                      cancel: false,
                    });
                  } else {
                    NavigationService.navigate('AskForReplacementScreen');
                  }
                }}
              >
                <Text style={[ApplicationStyles.screen.heading5Bold]}>
                  NEXT
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Text
            style={{
              fontSize: s(22),
              fontFamily: fonts.primary,
              color: colors.black,
              fontWeight: '600',
            }}
          >
            Why do you want to return the product?
          </Text>
        </View>
        <ScrollView style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Selector
            style={{ marginTop: vs(15), marginBottom: vs(10) }}
            placeholder={'Problem reason goes here'}
            data={[
              'The product is damaged',
              'The product is damaged',
              'The product is damaged',
            ]}
            onValueChange={(item) => {
              setShowPrefer(true);
            }}
          />
          <RNTextInput
            multiline={true}
            placeholder="Message"
            style={{
              marginTop: vs(16),
              height: vs(160),
              backgroundColor: colors.white,
              borderRadius: s(20),
              borderWidth: 1,
              borderColor: colors.grey20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: s(14),
              paddingVertical: s(20),
            }}
          />
          {showPrefer && (
            <SelectPrefer
              onChangeValue={(item) => {
                setPrefer(item);
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ReturnProductStep1;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});