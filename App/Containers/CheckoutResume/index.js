import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs } from 'react-native-size-matters';
import colors from '../../Themes/Colors';
import { AppBar, Button } from '../../Components';
import CartItem from './Cartitem';
import metrics from '../../Themes/Metrics';
import BottomSummary from './Summary';
import DeliverInfo from './DeliverInfo';
import NavigationService from '../../Navigation/NavigationService';

//orderStatus：1,completed
function CheckoutResume(props) {
  const {
    navigation: {
      state: {
        params: { orderStatus },
      },
    },
  } = props;

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView edges={['top', 'right', 'left', 'bottom']}>
        <AppBar
          title={orderStatus === 1 ? 'Order 782788' : 'Review your details'}
        />
        <ScrollView
          style={{
            paddingHorizontal: AppConfig.paddingHorizontal,
            height:
              orderStatus === 1
                ? metrics.screenHeight - 60
                : metrics.screenHeight - 220,
          }}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <DeliverInfo orderStatus={orderStatus} />
          <View>
            {orders.map((item, index) => (
              <CartItem key={index.toString()} product={item} />
            ))}
          </View>

          <BottomSummary orderStatus={orderStatus} />
        </ScrollView>
      </SafeAreaView>
      {orderStatus != 1 && (
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
            <Button
              onPress={() => {
                NavigationService.navigate('CheckoutPaymentCompletedScreen');
              }}
              text="PROCEED"
            ></Button>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

export default CheckoutResume;
