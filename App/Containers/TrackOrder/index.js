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

function TrackOrder(props) {
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
        <AppBar title="Track Order" />
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
              Estimated delivery date
            </Text>
            <Text
              style={[
                ApplicationStyles.screen.heading2Bold,
                { fontSize: s(32) },
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
              }}
            >
              <Header />
              <Trackers />
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