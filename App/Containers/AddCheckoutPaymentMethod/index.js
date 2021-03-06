import React from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../Components';
import styles from './styles';
import images from '../../Themes/Images';
import { ScrollView } from 'react-native-gesture-handler';
import Nav from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';

function AddCheckoutPaymentMethod(props) {
  const payments = [
    {
      image: images.userPayMethod2Image,
      onPress: () => {
        Nav.navigate('AddCreditScreen', {
          callback: () => {
            Nav.navigate('CheckoutResumeScreen', { orderStatus: 0 });
            // Nav.goBack();
          },
        });
      },
    },
    {
      image: images.userPayMethod6Image,
      onPress: () => {
        Nav.navigate('InSufficientSalamiCreditScreen');
      },
    },
    {
      image: images.userPayMethod1Image,
      onPress: () => {
        Nav.navigate('CheckoutResumeScreen', { orderStatus: 0 });
      },
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

  const {
    navigation: {
      state: { params },
    },
  } = props;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}> Add a payment method </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {payments.map((item, index) => {
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
                        Nav.navigate('AddCreditScreen', {
                          callback: () => {
                            Nav.navigate('CheckoutResumeScreen', {
                              orderStatus: 0,
                            });
                            // Nav.goBack();
                          },
                        });
                      }
                    }}
                  >
                    <Image source={item.image} style={styles.item} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AddCheckoutPaymentMethod;
