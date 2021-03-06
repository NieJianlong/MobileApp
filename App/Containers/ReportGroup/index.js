import React, { useContext, useState } from 'react';
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
import { AppBar, RightButton } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';

import { ApplicationStyles } from '../../Themes';

function ReportGroup(props) {
  const [showPrefer, setShowPrefer] = useState(false);
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
          rightButton={() => (
            <RightButton
              title="SUBMIT"
              onPress={() => {
                NavigationService.navigate('RefundScreen', { cancel: true });
              }}
            />
          )}
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
            Report
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ReportGroup;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
