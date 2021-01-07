/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 17:09:47
 * @LastEditTime: 2021-01-07 18:52:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserCenter/ItemBox.js
 */
import React from 'react';
import { View,Text,Image } from 'react-native';
import {ScaledSheet,s, vs} from 'react-native-size-matters';

function ItemBox(props) {
    const {title,icon} = props;
    return (
       
            <View style={styles.container}>
                <Image source={icon}></Image>
                <Text style={styles.itemText}>{title}</Text>
            </View>
       
    );
}

export default ItemBox;

const styles = ScaledSheet.create({
    container: {
     height:'94@s',
     width:'94@s',
     backgroundColor:'white',
     borderRadius:'18@s',
     marginTop:'15@s',
     shadowColor: "rgba(232, 240, 243, 0.13)",
        shadowOffset: {
            width: 0,
            height: '12@s',
        },
        shadowOpacity: 0.25,
    },
    itemText:{
        textAlign:'center'
    }
   
  });
  
