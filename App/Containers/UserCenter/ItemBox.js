/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 17:09:47
 * @LastEditTime: 2021-01-07 20:30:06
 * @LastEditors: Please set LastEditors
 * @Description: UserCenter item 
 * @FilePath: /MobileApp/App/Containers/UserCenter/ItemBox.js
 */
import React from 'react';
import { View,Text,Image } from 'react-native';
import {ScaledSheet,s, vs} from 'react-native-size-matters';

function ItemBox(props) {
    const {title,icon} = props;
    return (
       
            <View style={styles.container}>
                <Image style={styles.icon} source={icon}></Image>
                <Text style={styles.itemText}>{title}</Text>
            </View>
       
    );
}

export default ItemBox;

const styles = ScaledSheet.create({
    icon:{
        width:'100%',
        height:'30@s',
        marginBottom:10,
        resizeMode:'contain'
    },
    container: {
     height:'94@s',
     width:'94@s',
     justifyContent:'center',
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
  
