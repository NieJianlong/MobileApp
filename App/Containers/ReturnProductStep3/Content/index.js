import React from 'react';
import { View, Text } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { ApplicationStyles } from '../../../Themes';
import colors from '../../../Themes/Colors';

const contents = [
  'Print the return authorization with the barcode and shipping label.',
  'Pack the products carefully in their original packaging if you still have it.',
  'Enter the return authorization (barcode) on the package. Cut out the return label and stick it on the outside of the return label.',
];

function index(props) {
  return (
    <View>
      <Text
        style={[
          ApplicationStyles.screen.heading4Bold,
          { color: colors.grey80, marginTop: vs(15) },
        ]}
      >
        Instructions for shipping the package:
      </Text>
      {contents.map((item) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              marginTop: vs(10),
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: colors.grey80,
                borderRadius: s(3),
                width: s(6),
                height: s(6),
                marginRight: s(6),
              }}
            />
            <Text
              style={[
                ApplicationStyles.screen.txtRegular,
                { color: colors.grey80 },
              ]}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default index;
