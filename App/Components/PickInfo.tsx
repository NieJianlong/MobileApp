import { isEmpty } from "lodash";
import React from "react";
import { Image, Text, View } from "react-native";
import { t } from "react-native-tailwindcss";
import {
  CollectionPointFragment,
  DeliveryOption,
  SellerLocationFragment,
} from "../../generated/graphql";
// {`${
//     data?.pickupAddress?.houseNumber ?? ""
//   }${data?.pickupAddress?.flat ?? ""}${
//     data?.pickupAddress?.villageArea ?? ""
//   }${data?.pickupAddress?.townCity}${
//     data?.pickupAddress?.provinceState
//   }${data?.pickupAddress?.country} ${
//     data?.pickupAddress?.pinCode ?? ""
//   }`}

interface PickInfoProps {
  collectionPoint?: CollectionPointFragment;
  sellerLocation?: SellerLocationFragment;
  deliveryOption: DeliveryOption;
}
function PickInfo({
  collectionPoint,
  sellerLocation,
  deliveryOption,
}: PickInfoProps) {
  const isPickFromSeller =
    deliveryOption === DeliveryOption.SellerLocationPickup;
  const collectAddress = `${collectionPoint?.streetAddress1 ?? ""}${
    collectionPoint?.streetAddress2 ?? ""
  }${collectionPoint?.townCity}${collectionPoint?.provinceState}${
    collectionPoint?.country
  } ${collectionPoint?.areaCode ?? ""}`;
  const sellerAddress = `${sellerLocation?.streetAddress1 ?? ""}${
    sellerLocation?.streetAddress2 ?? ""
  }${sellerLocation?.townCity}${sellerLocation?.provinceState}${
    sellerLocation?.country
  } ${sellerLocation?.areaCode ?? ""}`;
  const address = isPickFromSeller ? sellerAddress : collectAddress;
  return (
    <View style={[t.p4]}>
      <View style={[t.bgWhite, t.roundedLg, t.p3]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Image style={[t.w4, t.h4]} source={require("../Images/user.png")} />
          <Text style={[t.fontBold, t.mL2]}>Contact Person</Text>
        </View>
        <Text style={[t.textGray500, t.mT2]}>
          {isPickFromSeller
            ? sellerLocation?.contactPerson
            : collectionPoint?.contactPerson}
        </Text>
      </View>
      <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Image
            style={[t.w6, t.h6]}
            source={require("../Images/usercenter/ubiling.png")}
          />
          <Text style={[t.fontBold, t.mL1]}>Pick Up Location</Text>
        </View>
        <Text style={[t.textGray500, t.mT2]}>{address}</Text>
      </View>
      {deliveryOption === DeliveryOption.CollectionPointPickup && (
        <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
          <View style={[t.flexRow, t.itemsCenter]}>
            <Image
              style={[t.w4, t.h4]}
              source={require("../Images/time2.png")}
            />
            <Text style={[t.fontBold, t.mL2]}>Opening Times</Text>
          </View>
          {!isEmpty(collectionPoint?.openingHours) &&
            collectionPoint?.openingHours?.map((openItem) => (
              <Text style={[t.textGray500, t.mT2]}>{openItem}</Text>
            ))}
        </View>
      )}
      <View style={[t.bgWhite, t.roundedLg, t.p3, t.mT4]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Image
            style={[t.w6, t.h6]}
            source={require("../Images/usercenter/phone.png")}
          />
          <Text style={[t.fontBold, t.mL1]}>Contact Number</Text>
        </View>
        <Text style={[t.textGray500, t.mT2]}>
          {isPickFromSeller
            ? sellerLocation?.contactNumber
            : collectionPoint?.contactNumber}
        </Text>
      </View>
    </View>
  );
}

export default PickInfo;
