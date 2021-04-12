import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar, RightButton, SearchBox } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import CheckBox from '../Explore/Components/CheckBox';
import metrics from '../../Themes/Metrics';
import { ApplicationStyles } from '../../Themes';
const countries = () =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => `Country ${item}`);

const languages = () =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => `Language ${item}`);

function SelectCountryOrLanguage(props) {
  const {
    navigation: {
      state: {
        params: { key },
      },
    },
  } = props;
  const [selectValue, setSelectValue] = useState(
    key == 'country' ? countries()[0] : languages()[0]
  );
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
          title={`Select a ${key}`}
          rightButton={() => (
            <RightButton
              title="SAVE"
              onPress={() => {
                NavigationService.goBack();
              }}
            />
          )}
        />

        <View style={{ height: metrics.screenHeight - vs(64) }}>
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <SearchBox placeholder={`Search for a ${key}`}></SearchBox>
          </View>

          <FlatList
            contentContainerStyle={{ paddingBottom: vs(44) }}
            data={key == 'country' ? countries() : languages()}
            renderItem={({ item }, index) => {
              return (
                <View
                  style={{ paddingHorizontal: AppConfig.paddingHorizontal }}
                >
                  <View style={{ height: vs(12) }} />
                  <CheckBox
                    defaultValue={selectValue == item}
                    onSwitch={(t) => setSelectValue(item)}
                    label={item}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => `ass${index}`}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default SelectCountryOrLanguage;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
