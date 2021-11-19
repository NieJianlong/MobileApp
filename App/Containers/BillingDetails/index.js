import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Switch } from "../../Components";
import { AlertContext } from "../Root/GlobalContext";

import styles from './styles';
import BillingAddressBottomSheet from "../../Components/BillingAddressBottomSheet";
import { billingAddrsses } from "./constant";
import { Action_Type, Billing_Type } from "../AddBillingDetails/const";
import NavigationService from "../../Navigation/NavigationService";
import images from "../../Themes/Images";

function BillingDetails(props) {
    const { dispatch } = useContext(AlertContext);
    const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);

    const onAddressClick = (id) => {
        console.log('id ==>', id);

        dispatch({
            type: 'changSheetState',
            payload: {
                showSheet: false,
            }
        })
    }

    const onAddNewAddress = () => {
        dispatch({
            type: 'changSheetState',
            payload: {
                showSheet: false,
            }
        })

        const params = {
            title: 'Please enter your billing details',
            billingType: Billing_Type.BILLING,
            actionType: Action_Type.NEXT,
        };
        NavigationService.navigate("AddBillingDetailsScreen", params);
    }

    return (
        <BaseScreen {...props}>
            <AppBar 
                rightButton={() => {
                    return (
                    <TouchableOpacity
                        onPress={() => {}}
                    >
                        <Text style={styles.rightButton}>Next</Text>
                    </TouchableOpacity>
                    );
                }}
            />
            <View style={styles.container}>
            <View style={styles.horizontalCenter}>
                <Text style={styles.title}>Please enter your billing details</Text>
            </View>

            <View style={styles.actionWrapper}>
                <View style={styles.switch}>
                    <Switch
                        onSwitch={(b) => setIsSameAsDelivery(b)}
                        active={isSameAsDelivery}
                        label="Billing address is the same as delivery"
                    />
                </View>

                <TouchableOpacity
                    onPress={() => dispatch({
                        type: 'changSheetState',
                        payload: {
                            showSheet: true,
                            sheetTitle: 'Billing Address',
                            children:   <BillingAddressBottomSheet
                                            addresses={billingAddrsses}
                                            onAddressClick={onAddressClick}
                                            onAddNewAddress={onAddNewAddress}
                                        />,
                            height: 320,
                        }
                    })}
                >
                    <View style={styles.saveAddress}>
                        <View style={styles.addressIcon}>
                            <Image source={images.addressIcon} />
                        </View>
                        <Text style={styles.saveAddressText}>Use a saved address or add new address</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.deliveryAddressSection}>
                <Text style={styles.deliveryAddressSectionTitle}>Current Delivery Address</Text>
                <View style={styles.deliveryDescriptionBox}>
                <Text style={styles.deliveryDescriptionText}>47, 15, Ram Krishna Ghosh Rd, Sinthee</Text>
                <Text style={styles.deliveryDescriptionText}>Kolkata, West Bengal</Text>
                <Text style={styles.deliveryDescriptionText}>700050, India</Text>
                </View>
            </View>
            </View>
        </BaseScreen>
    );
}

export default BillingDetails;