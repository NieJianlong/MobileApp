import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import { s, ScaledSheet, vs } from 'react-native-size-matters'
import { Fonts, Colors, ApplicationStyles, Images } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'
import NavigationService from '../../../Navigation/NavigationService'
import {
    StarRating,
    Progress
} from '../../../Components'

function ProductItem(props) {

    useEffect(() => {

    })

    const {
        size,
        product,
        onPress,
        onPressShare
    } = props

    if (size === 'M' || size == 'L') {
        return (
            <TouchableOpacity
                onPress={() => NavigationService.navigate('ProductDetailScreen')}
                style={styles.productContainer}>
                {
                    size === 'M' ?
                        <View style={[styles.row, { paddingHorizontal: AppConfig.paddingHorizontal }]}>
                            <Image source={{ uri: product.picture }} style={styles.productImage} />

                            <View style={styles.v2}>
                                <View>
                                    <Text style={styles.heading4Bold}>{product.name}</Text>
                                    <StarRating rating={product.rating} ratingCount={product.ratingCount} />
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.v3}>
                                        <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                                        <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text>
                                    </View>

                                    <View style={styles.v3}>
                                        <Text style={[styles.txtNoteBold, { color: Colors.black }]}>WHOLE SALE PRICE</Text>
                                        <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text>
                                    </View>

                                    <View style={styles.percentOffContainer}>
                                        <Text style={[styles.heading6Bold, { color: Colors.secondary00 }]}>30% OFF</Text>
                                    </View>
                                </View>
                            </View>
                        </View> :
                        <View style={[{ paddingHorizontal: AppConfig.paddingHorizontal }]}>
                            <Image source={{ uri: product.picture }} style={styles.productImageBig} />

                            <View style={styles.v2}>
                                <View>
                                    <Text style={styles.heading4Bold}>{product.name}</Text>
                                    <StarRating rating={product.rating} ratingCount={product.ratingCount} />
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.v3}>
                                        <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                                        <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text>
                                    </View>

                                    <View style={styles.v3}>
                                        <Text style={[styles.txtNoteBold, { color: Colors.black }]}>WHOLE SALE PRICE</Text>
                                        <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text>
                                    </View>

                                    <View style={styles.percentOffContainer}>
                                        <Text style={[styles.heading6Bold, { color: Colors.secondary00 }]}>30% OFF</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                }

                <View style={styles.v4}>
                    <View>
                        <Text style={styles.txtOrderClose}>Order closes on:</Text>
                        <Text style={styles.heading6Regular}>{product.orderClose}</Text>
                    </View>

                    <Progress
                        maximumValue={product.inStock}
                        currentValue={product.orderCount}
                        barWidth={s(60)}
                        barHeight={vs(6)}
                    />

                    <View style={styles.row}>
                        <Image source={Images.stock} style={styles.icStock} />
                        <Text style={styles.txtOrderNumber}>{product.orderCount}/{product.inStock}</Text>
                        <TouchableOpacity>
                            <Image source={Images.info2} style={styles.icInfo} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity>
                            <Image source={Images.likeMed} style={styles.icShare} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onPressShare}>
                            <Image source={Images.share} style={styles.icShare} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    } else if (size === 'S') {
        return (
            <TouchableOpacity style={styles.productContainerSmall}>
                <View style={styles.productInfoSmall}>
                    <View>
                        <Image
                            source={{ uri: product.picture }}
                            style={styles.productImageSmall}
                            resizeMode={'contain'}
                        />

                        <View style={styles.productSmallActionContainer}>
                            <TouchableOpacity style={styles.roundBtnContainer}>
                                <Image source={Images.likeMed} style={styles.roundBtnIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.roundBtnContainer}>
                                <Image source={Images.share} style={styles.roundBtnIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={[styles.txtBold, { color: Colors.black }]}>{product.name}</Text>
                    <StarRating rating={product.rating} ratingCount={product.ratingCount} />

                    <View style={[styles.row, { marginTop: vs(5) }]}>
                        <View style={{ marginRight: s(10) }}>
                            <Text style={styles.txtNoteBold}>RETAIL PRICE</Text>
                            <Text style={styles.txtRetailPrice}>${product.retailPrice}</Text>
                        </View>

                        <View style={{ marginRight: s(10) }}>
                            <Text style={[styles.txtNoteBold, { color: Colors.black }]}>WHOLE SALE PRICE</Text>
                            <Text style={styles.txtWholesalePrice}>${product.wholesalePrice}</Text>
                        </View>

                        <View style={styles.percentOffContainerSmall}>
                            <Text style={[styles.txtNoteBold, { color: Colors.secondary00 }]}>30% OFF</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.row, { paddingHorizontal: s(8), marginTop: vs(5) }]}>
                    <Progress
                        maximumValue={product.inStock}
                        currentValue={product.orderCount}
                    />
                    <Image source={Images.stock} style={styles.icStockSmall} />
                    <Text style={styles.heading6Regular}>{product.orderCount}/{product.inStock}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


ProductItem.propTypes = {

}

ProductItem.defaultProps = {

}

const styles = ScaledSheet.create({
    ...ApplicationStyles.screen,
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productContainer: {
        backgroundColor: Colors.white,
        paddingTop: '10@vs',
        paddingBottom: '10@vs',
        marginBottom: '16@vs'
    },
    productImage: {
        width: '88@s',
        height: '88@s'
    },
    productImageBig: {
        width: '300@s',
        height: '300@s'
    },
    v2: {
        justifyContent: 'space-between',
        height: '88@s'
    },
    txtRetailPrice: {
        ...ApplicationStyles.screen.heading4Bold,
        color: Colors.grey60,
        textDecorationLine: 'line-through',
        marginTop: '2@vs'
    },
    txtWholesalePrice: {
        ...ApplicationStyles.screen.heading4Bold,
        color: Colors.primary,
        marginTop: '2@vs'
    },
    v3: {
        marginRight: '20@s'
    },
    percentOffContainer: {
        backgroundColor: Colors.secondary01,
        paddingHorizontal: '10@s',
        paddingVertical: '5@s',
        borderRadius: '30@s'
    },
    txtOrderClose: {
        fontSize: '8@s',
        fontFamily: Fonts.primary,
        color: Colors.black,
    },
    v4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: AppConfig.paddingHorizontal,
        borderTopWidth: 2,
        borderTopColor: Colors.grey10,
        marginTop: '5@vs',
        paddingTop: '10@vs'
    },
    icStock: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.grey60,
        marginRight: '5@s'
    },
    txtOrderNumber: {
        ...ApplicationStyles.screen.heading6Regular,
        fontSize: '13@s'
    },
    icInfo: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.secondary00,
        marginLeft: '5@s'
    },
    icShare: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.black,
        marginLeft: '5@s'
    },
    productContainerSmall: {
        width: '175@s',
        backgroundColor: Colors.white,
        paddingTop: '5@vs',
        paddingBottom: '5@vs',
        marginBottom: '16@vs',
    },
    productInfoSmall: {
        paddingHorizontal: '8@s',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey10,
        paddingBottom: '8@vs'
    },
    productImageSmall: {
        width: '150@s',
        height: '150@s',
        alignSelf: 'center'
    },
    percentOffContainerSmall: {
        backgroundColor: Colors.secondary01,
        paddingHorizontal: '5@s',
        paddingVertical: '2@s',
        borderRadius: '30@s'
    },
    roundBtnContainer: {
        width: '24@s',
        height: '24@s',
        borderRadius: '15@s',
        backgroundColor: Colors.grey10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundBtnIcon: {
        width: '15@s',
        height: '15@s',
        tintColor: Colors.grey80
    },
    productSmallActionContainer: {
        position: 'absolute',
        bottom: 0, left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    icStockSmall: {
        width: '15@s',
        height: '15@s',
        tintColor: Colors.grey60,
        marginLeft: '10@s'
    }
})

export default ProductItem