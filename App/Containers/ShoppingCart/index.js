import React from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  FlatList,
  SectionList,
  TouchableOpacity,
  Text,
  Image,
  Touchable,
} from 'react-native';
import Empty from './Empty';
import AddressBar from './AddressBar';
import styles from './styles';
import CartSummary from './CartSummary';
import CartItem from './Cartitem';
import { Button } from '../../Components';
import { s, vs } from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';
const datas = () =>
  [0, 1, 2, 3, 4].map(() => ({
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24,
  }));

function index(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        <SectionList
          sections={[{ title: '', data: datas() }]}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderSectionHeader={() => (
            <View
              style={{
                paddingHorizontal: AppConfig.paddingHorizontal,
                backgroundColor: 'white',
                height: 80,
              }}
            >
              <Button text="PROCEED TO CHECKOUT"></Button>
            </View>
          )}
          renderSectionFooter={() => (
            <View
              style={{
                paddingHorizontal: AppConfig.paddingHorizontal,
                backgroundColor: 'white',
                height: 80,
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: s(40),
                  backgroundColor: colors.grey80,
                  width: s(170),
                  height: s(32),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -25,
                }}
              >
                <Text
                  style={[
                    styles.heading4Bold,
                    { color: 'white', textAlign: 'center' },
                  ]}
                >
                  PAY DURING DELIVERY
                </Text>
              </TouchableOpacity>
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
                  <Text style={[styles.txtRegular, { color: colors.grey80 }]}>
                    Remember that you will get your product once the
                  </Text>
                  <View style={styles.row}>
                    <Text style={[styles.txtRegular, { color: colors.grey80 }]}>
                      number of slices has been reached
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.txtRegular,
                          { color: colors.secondary00, paddingLeft: 6 },
                        ]}
                      >
                        Learn more
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          stickyHeaderIndices={0}
          ListHeaderComponent={() => (
            <View style={{ backgroundColor: 'white' }}>
              <AddressBar />
              <CartSummary />
            </View>
          )}
          renderItem={({ item }) => (
            <CartItem key={index.toString()} product={item} />
          )}
          keyExtractor={(item, index) => `lll${index}`}
        />
      </SafeAreaView>
    </View>
  );
}

export default index;
