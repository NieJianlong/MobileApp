import React from 'react';
import { View, ScrollView, Text, SafeAreaView, StatusBar } from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar } from '../../Components';
import { ApplicationStyles } from '../../Themes';
import Header from './header';
import Trackers from './trackers';
import { useRoute } from '@react-navigation/core';
import Qrcode from './qrcode';

function TrackOrder(props) {
  const {
    params: { type },
  } = useRoute();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'absolute',
        top: 30,
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
          title={type === 'track' ? 'Track Order' : 'Order return status'}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: vs(64) }}>
          <View
            style={{
              alignItems: 'center',
              height: vs(100),
              justifyContent: 'center',
            }}
          >
            <Text
              style={[ApplicationStyles.screen.txtRegular, { fontSize: s(14) }]}
            >
              {`Estimated ${type === 'track' ? 'delivery' : 'return'} date`}
            </Text>
            <View style={{ height: 10, width: '100%' }} />
            <Text
              style={[
                ApplicationStyles.screen.heading2Bold,
                { fontSize: s(32), paddingTop: 10 },
              ]}
            >
              22 Oct 2020
            </Text>
          </View>
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: s(16),
                flex: 1,
                display: "flex",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Header />
              <Qrcode value="order 123353656"/>
              <Trackers type={type} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default TrackOrder;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
