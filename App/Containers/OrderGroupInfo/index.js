import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import CartItem from './Cartitem';
import ListItem from '../UserInfo/ListItem';
import images from '../../Themes/Images';

const productInfo = {
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
};

const items = [
  {
    lefticon: images.orderDetailImage,
    text: 'Order details',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: true,
  },
  {
    lefticon: images.orderInvoiceImage,
    text: 'Invoice',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: true,
  },
  {
    lefticon: images.orderWriteReviewImage,
    text: 'Write a review about the product',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: true,
  },
  {
    lefticon: images.orderEvaluateSellerImage,
    text: 'Evaluate the seller',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: true,
  },
  {
    lefticon: images.orderTrackImage,
    text: 'Track order',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: true,
  },
  {
    lefticon: images.orderReturnImage,
    text: 'Return product',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: true,
  },
  {
    lefticon: images.orderCancelImage,
    text: 'Cancel order',
    righticon: images.userRightBtnImage,
    onPress: () => {},
    hasline: false,
  },
];

function index(props) {
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
        <AppBar title="Group Info" />
        <ScrollView>
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <CartItem product={productInfo} />
          </View>
          {items.map((item, index) => {
            return (
              <ListItem
                leftStyle={{
                  marginLeft: 10,
                  width: s(50),
                  height: s(25),
                  resizeMode: 'contain',
                }}
                key={`listitem` + index}
                {...item}
              ></ListItem>
            );
          })}
          <Text style={styles.txt3}>Who bought this item also bought...</Text>
        </ScrollView>
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
});
