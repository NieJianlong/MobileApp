import React, { useState, useContext, useReducer } from 'react';
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
import NavigationService from '../../Navigation/NavigationService';
import { AlertContext } from '../Root/index';
import TextTip from '../UserInfo/TextTip';

//Alert Context, which controls the display and hiding of an alert, for example, Add Address Success
export const CartContext = React.createContext({});
//reducer,useContext+useReducer,It is easy for child components to control parent components
const initialState = {
  datas: [0, 1, 2, 3, 4].map((item, index) => ({
    id: index,
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
    count: 1,
  })),
};
function reducer(state, action) {
  const datas = state.datas;

  switch (action.type) {
    case 'addCartCount':
      return {
        ...state,
        datas: datas.map((item) => {
          if (item.id == action.payload) {
            item.count = item.count + 1;
          }
          return item;
        }),
      };
    case 'subCartCount':
      return {
        ...state,
        datas: datas.map((item) => {
          if (item.id == action.payload) {
            item.count = item.count - 1;
          }
          return item;
        }),
      };
    case 'revomeCartCount':
      const index = datas.findIndex((item) => item.id == action.payload);
      datas.splice(index, 1);
      return { ...state, datas };
    default:
      throw new Error();
  }
}
function index(props) {
  const [paidDuringDelivery, setPaidDuringDeliver] = useState(false);
  const [{ datas }, dispatch] = useReducer(reducer, initialState);
  const sheetContext = useContext(AlertContext);
  return (
    <CartContext.Provider value={{ dispatch }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={styles.mainContainer}
          edges={['top', 'left', 'right']}
        >
          <SectionList
            sections={datas.length > 0 ? [{ title: '', data: datas }] : []}
            ListEmptyComponent={() => {
              return <Empty />;
            }}
            contentContainerStyle={{ paddingBottom: 60 }}
            renderSectionHeader={() => (
              <View
                style={{
                  paddingHorizontal: AppConfig.paddingHorizontal,
                  backgroundColor: 'white',
                  height: 80,
                }}
              >
                <Button
                  onPress={() => {
                    NavigationService.navigate('CheckoutNoAuthScreen');
                  }}
                  text="PROCEED TO CHECKOUT"
                ></Button>
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
                {!paidDuringDelivery ? (
                  <TouchableOpacity
                    onPress={() => setPaidDuringDeliver(true)}
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
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.txtRegular,
                          { fontSize: s(14), color: colors.black },
                        ]}
                      >
                        Product paid during delivery.
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          sheetContext.dispatch({
                            type: 'changSheetState',
                            payload: {
                              showSheet: true,
                              height: 300,
                              children: () => {
                                const data = {
                                  textTip: 'Paying during delivery',
                                  subTextTip:
                                    'This is an explanatory text about this feature, lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo.',
                                  needButton: true,
                                  btnMsg: 'OK',
                                  onPress: () => {
                                    sheetContext.dispatch({
                                      type: 'changSheetState',
                                      payload: {
                                        showSheet: false,
                                      },
                                    });
                                  },
                                };
                                return (
                                  <View
                                    style={{
                                      height: 320,
                                      marginLeft: -AppConfig.paddingHorizontal,
                                    }}
                                  >
                                    <TextTip {...data} />
                                  </View>
                                );
                              },
                            },
                          });
                        }}
                      >
                        <Text
                          style={[
                            styles.txtRegular,
                            { color: colors.secondary00, paddingLeft: 6 },
                          ]}
                        >
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.txtRegular,
                          { color: colors.secondary00, paddingLeft: 6 },
                        ]}
                      >
                        PAY NOW
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
                      <Text
                        style={[styles.txtRegular, { color: colors.grey80 }]}
                      >
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
            ListHeaderComponent={() => {
              return datas.length > 0 ? (
                <View style={{ backgroundColor: 'white' }}>
                  <AddressBar />
                  <CartSummary />
                </View>
              ) : null;
            }}
            renderItem={({ item }) => {
              return <CartItem product={item} />;
            }}
            keyExtractor={(item, index) => `lll${index}`}
          />
        </SafeAreaView>
      </View>
    </CartContext.Provider>
  );
}

export default index;
