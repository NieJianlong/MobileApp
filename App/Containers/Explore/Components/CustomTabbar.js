import React, { useRef, useContext, useCallback } from 'react';
import { TabBar } from 'react-native-tab-view';
import colors from '../../../Themes/Colors';
import { Text } from 'react-native';
import styles from '../styles';

export default function CustomTabbar(props) {
  return (
    <TabBar
      {...props}
      tabStyle={{ width: 'auto' }}
      indicatorStyle={{ backgroundColor: colors.primary, marginTop: -40 }}
      indicatorContainerStyle={{ marginTop: -40 }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[
            styles.heading5Bold,
            styles.categoryItemContainer,
            // !focused && { borderBottomColor: 'transparent' },
            {
              color: focused ? colors.primary : colors.grey60,

              paddingRight: route.title === 'Fashion' ? 60 : 'auto',
            },
          ]}
        >
          {route.title}
        </Text>
      )}
      scrollEnabled
      style={{ backgroundColor: 'transparent' }}
    />
  );
}
