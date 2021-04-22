import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList } from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar, Button } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import CheckBox from '../AskForReplacement/CheckBox';
import { useRoute } from '@react-navigation/native';

const countries = [
  {
    label: 'Salami Credit',
    sublabel: '',
    extra: 'FASTER',
  },
  {
    label: 'Mastercard **********6756',
    sublabel: '',
    extra: '',
  },
];

function Refund(props) {
  const [selectValue, setSelectValue] = useState(countries[0]);
  const { params } = useRoute();
  const { cancel } = params;

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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar />

        <FlatList
          contentContainerStyle={{ paddingBottom: vs(44) }}
          data={countries}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
              <Text
                style={{
                  fontSize: s(24),
                  fontFamily: fonts.primary,
                  color: colors.black,
                  fontWeight: '600',
                }}
              >
                Where do you want to receive your refund?
              </Text>
            </View>
          }
          renderItem={({ item }, index) => {
            return (
              <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
                <View style={{ height: vs(12) }} />
                <CheckBox
                  defaultValue={selectValue == item}
                  onSwitch={(t) => setSelectValue(item)}
                  {...item}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => `ass${index}`}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Button
            onPress={() => {
              cancel
                ? NavigationService.navigate('CancelOrderCompletedScreen')
                : NavigationService.navigate('ReturnProductStep2Screen');
            }}
            color={colors.primary}
            text={cancel ? 'CANCEL ORDER' : 'CONTINUE'}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Refund;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
