import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import { ApplicationStyles } from '../../Themes';
import metrics from '../../Themes/Metrics';

function index(props) {
  const payments = [
    {
      image: images.userPayMethod2Image,
      onPress: () => {
        NavigationService.navigate('AddCreditScreen', {
          callback: () => {
            NavigationService.navigate('CheckoutResumeScreen',{orderStatus:0});
            // Nav.goBack();
          },
        });
      },
    },
    {
      image: images.userPayMethod1Image,
      onPress: () => {},
    },
    {
      image: images.userPayMethod3Image,
      onPress: () => {},
    },
    {
      image: images.userPayMethod4Image,
      onPress: () => {},
    },
    {
      image: images.userPayMethod5Image,
      onPress: () => {},
    },
  ];

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
        <AppBar />
        <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
          <Text
            style={{
              fontSize: s(24),
              fontFamily: fonts.primary,
              color: colors.black,
              fontWeight: '600',
            }}
          >
            Your credit is not enough
          </Text>
          <FlatList
            data={payments}
            showsVerticalScrollIndicator={false}
            style={{ height: metrics.screenHeight - 200 }}
            ListHeaderComponent={() => {
              return (
                <View>
                  <View
                    key={`header${index}`}
                    style={[styles.item, { height: vs(64) }]}
                  >
                    <View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text style={styles.itemTitle}>Salami Credit</Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={styles.itemSubTitle}>$20.00</Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity>
                      <Text
                        style={[
                          ApplicationStyles.screen.subtitle,
                          { color: colors.grey60 },
                        ]}
                      >
                        DESELECT
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                    }}
                  >
                    <Text style={styles.title}>Add a payment method</Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={ApplicationStyles.screen.heading2Bold}>
                        $19.99
                      </Text>
                      <Text
                        style={[
                          ApplicationStyles.screen.subtitle,
                          { marginTop: 10, color: colors.grey60 },
                        ]}
                      >
                        left
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        ApplicationStyles.screen.subtitle,
                        { marginTop: 10, color: colors.grey80, fontSize: 16 },
                      ]}
                    >
                      You don’t have enough salami credit, select a payment
                      method to pay the remaining amount
                    </Text>
                  </View>
                </View>
              );
            }}
            renderItem={({ item }) => {
              return (
                <View
                  key={`paymengt${index}`}
                  style={{
                    maxHeight: 110,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (item.onPress) {
                        item.onPress();
                      } else {
                        NavigationService.navigate('AddCreditScreen', {
                          callback: () => {
                            NavigationService.navigate('CheckoutResumeScreen',{orderStatus:0});
                            // Nav.goBack();
                          },
                        });
                      }
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: '100%',
                        //   marginTop:'10@vs',
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          ></FlatList>
        </View>
      </SafeAreaView>
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
  item: {
    marginTop: '15@vs',
    backgroundColor: colors.white,
    borderRadius: '16@s',
    height: '122@vs',
    paddingHorizontal: AppConfig.paddingHorizontal,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#409AEF',
  },
  itemTitle: {
    fontSize: '14@s',
    fontFamily: fonts.primary,
    color: colors.black,
    fontWeight: '600',
  },
  itemSubTitle: {
    fontSize: '14@s',
    fontFamily: fonts.primary,
    color: colors.grey80,
  },
  paytypeIcon: {
    width: '26@s',
    height: '26@s',
    resizeMode: 'contain',
  },
  icon: {
    width: '20@s',
    height: '20@s',
    marginLeft: '12@s',
    resizeMode: 'contain',
  },
  editImage: {
    width: '24@s',
    height: '24@s',
    marginLeft: '12@s',
    resizeMode: 'contain',
  },
});
