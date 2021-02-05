import React, { useState } from 'react';
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
import { AppBar, Button } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import CartItem from './Cartitem';
import metrics from '../../Themes/Metrics';

function index(props) {
  const [datas, setDatas] = useState([
    {
      icon: images.userDeliverytoImage,
      title: 'Deliver to:',
      subtitle: 'Username, Streetname 00',
      subtitle1: 'County, City',
      type: 'delivery',
    },
    {
      icon: images.userUBillingImage,
      title: 'Billing Address:',
      subtitle: 'Username, Streetname 00',
      subtitle1: 'County, City',
      type: 'delivery',
    },
    {
      icon: images.userUPayImage,
      title: 'Payment',
      subtitle: 'Salami Credit',
      subtitle1: images.userLogoImage,
      type: 'Payment',
    },
  ]);
  const [orders, setOrders] = useState(
    [0, 1, 2, 3, 4].map((item, index) => ({
      id: index,
      name: 'The product name can be longer and occupy two lines',
      picture:
        'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
      rating: 3.0,
      ratingCount: 124,
      retailPrice: 2345,
      wholesalePrice: 1542,
      orderClose: '22/12/2020',
      inStock: 100,
      orderCount: 24,
      count: 1,
    }))
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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar title="Review your details" />
        <FlatList
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            height: metrics.screenHeight - 220,
          }}
          data={orders}
          renderItem={({ item }) => {
            debugger;
            return <CartItem key={index.toString()} product={item} />;
          }}
          ListHeaderComponent={() => {
            return (
              <View>
                {datas.map((item, index) => {
                  return (
                    <View
                      key={`header${index}`}
                      style={[styles.item, { height: vs(80) }]}
                    >
                      <View>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Image
                            style={styles.paytypeIcon}
                            source={item.icon}
                          ></Image>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            {item.type == 'Payment' && (
                              <Image
                                style={styles.paytypeIcon}
                                source={item.subtitle1}
                              ></Image>
                            )}
                            <Text style={styles.itemSubTitle}>
                              {item.subtitle}
                            </Text>
                          </View>

                          {item.type != 'Payment' && (
                            <Text style={styles.itemSubTitle}>
                              {item.subtitle1}
                            </Text>
                          )}
                        </View>
                      </View>

                      <TouchableOpacity>
                        <Image
                          style={styles.editImage}
                          source={images.userAddressEditImage}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: AppConfig.paddingHorizontal,
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.title}>Your order</Text>
                  <TouchableOpacity>
                    <Image
                      style={styles.editImage}
                      source={images.userAddressEditImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View
          style={{
            height: vs(80),
            width: '100%',
            backgroundColor: colors.white,
            paddingHorizontal: AppConfig.paddingHorizontal,
            paddingTop: vs(15),
          }}
        >
          <Button text="PROCEED"></Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default index;
const styles = ScaledSheet.create({
  item: {
    marginTop: '15@vs',
    backgroundColor: colors.white,
    borderRadius: '16@s',
    height: '122@vs',
    paddingHorizontal: AppConfig.paddingHorizontal,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
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
