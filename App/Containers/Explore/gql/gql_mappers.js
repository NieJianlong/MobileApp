//"      photo:
// "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",

/**
 * const product = {
    name: 'iPhone 11',
    picture: 'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
    photoUrls: [
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
        'https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png',
    ],
    rating: 3.5,
    ratingCount: 624,
    ratingDetail: {
        oneStar: 41,
        twoStar: 150,
        threeStar: 50,
        fourStar: 74,
        fiveStar: 309,
    },
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24,
    seller: {
        avatar: 'https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png',
        name: 'thegioididong',
        description: 'Thegioididong.com là thương hiệu thuộc Công ty Cổ phần Thế giới di động, Tên tiếng Anh là Mobile World JSC, (mã Chứng Khoán: MWG) là một tập đoàn bán lẻ tại Việt Nam với lĩnh vực kinh doanh chính là bán lẻ điện thoại di động, thiết bị số và điện tử tiêu dùng[2]. Theo nghiên cứu của EMPEA, thống kê thị phần bán lẻ điện thoại di động tại Việt Nam năm 2014 thì Thế giới di động hiện chiếm 25% và là doanh nghiệp lớn nhất trong lĩnh vực của mình.',
        rating: 4.2,
        ratingCount: 1024,
    },
    colors: [
        { name: 'Onyx Black', available: true },
        { name: 'Glaciar Green', available: true },
        { name: 'Interstella Glow', available: true },
        { name: 'Blue', available: false }
    ]
}
 */

/**
 * added in missing data for styling and null pointers due to diff names in code for the same thing
 * also needed fields in the prduct object as we walk through the state on the way to checkout
 * eg selected variants group id see selectedProductVariants: {},
 */
export const mapProductListingDTO = (data) => {
  let pList = [];
  let photoUrlsM = [
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
    "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  ];
  for (const element of data) {
    let hidePickUpFromSeller = false;
    if (element.collectionPointAddressId === null) {
      hidePickUpFromSeller = true;
    }

    let sellerM = {};

    if (element.seller) {
      sellerM.id = element.seller.id;
      sellerM.name = element.seller.brandName;
      sellerM.rating = element.seller.ratingCount;
      // see see product detail 547
      sellerM.description =
        "undefined in gql schema not someone set a constraint in DescriptionText that breaks for short descriptions";
      sellerM.brandName = element.seller.brandName;
    }

    // colors will come from options group values
    // ratingDetail will come from ?
    let bag = {
      id: element.productId, // the backend will often refer to this as the product listing id so be careful
      name: element.longName, // see product item 441
      photo: element.photo,
      photoUrls: element.photoUrls.length !== 0 ? element.photoUrls : [],
      productName: element.shortName,
      rating: element.rating,
      numberOfReviews: element.numberOfReviews,
      wholesalePrice: element.wholeSalePrice,
      retailPrice: element.retailPrice,
      percentOff: element.percentOff,
      noOfItemsInStock:
        element.noOfItemsInStock !== 0 ? element.noOfItemsInStock : 32,
      noOfOrderedItems:
        element.noOfOrderedItems !== 0 ? element.noOfOrderedItems : 50,
      closedDate: element.closedDate,
      orderClose: element.closedDate, // this is for Prod..Detail screen fix later
      collectionPointAddressId: element.collectionPointAddressId, //
      seller: sellerM,
      // product detail fuck ups
      inStock: element.noOfItemsInStock !== 0 ? element.noOfItemsInStock : 32,
      orderCount:
        element.noOfOrderedItems !== 0 ? element.noOfOrderedItems : 50,
      colors: [
        { name: "Onyx Black", available: true },
        { name: "Glaciar Green", available: true },
        { name: "Interstella Glow", available: true },
        { name: "Blue", available: false },
      ],
      ratingDetail: {
        oneStar: 41,
        twoStar: 150,
        threeStar: 50,
        fourStar: 74,
        fiveStar: 309,
      },
      highlightBullets: element.highlightBullets,
      hidePickUpFromSeller: hidePickUpFromSeller,
      selectedProductVariants: [], // a list of objects {gid, selectedVal}
      // prodVariants:
      //   element.variants.length === 0
      //     ? [sizeVariant, colorVariant]
      //     : element.variants,
    };
    pList.push(bag);
  }
  return pList;
};

/**
 *  pinCode  provinceState townCity villageArea houseNumber flat landMark
 */
export const mapGQLAddressToDelivery = (data, isfull) => {
  let address = "";

  if (data.building) {
    address = data.building;
  }
  if (data?.streetAddress1) {
    address = address + " " + data.streetAddress1;
  }
  if (data?.streetAddress2) {
    address = address + " " + data.streetAddress2;
  }
  if (data?.streetAddress3) {
    address = address + " " + data.streetAddress3;
  }
  if (data?.townCity) {
    address = address + " " + data.townCity;
  }
  if (data?.provinceState) {
    address = address + " " + data.provinceState;
  }
  if (data?.country) {
    address = address + " " + data.country;
  }

  if (data?.pinCode) {
    address = address + " " + data.pinCode;
  }
  if (data?.areaCode) {
    address = address + " " + data.areaCode;
  }

  if (address.length > 32 && !isfull) {
    address = address.substring(0, 30) + "...";
  }
  return address;
};

export const mapGQLAddressToLine2 = (data) => {
  let address = "";

  if (data?.villageArea) {
    address = address + " " + data.villageArea;
  }

  if (data?.houseNumber) {
    address = address + " " + data.houseNumber;
  }

  if (data?.flat) {
    address = address + " " + data.flat;
  }

  if (data?.landMark) {
    address = address + " " + data.landMark;
  }

  return address;
};

/**
 * possible comining in
 * AddressResponse {addressId:ID flat:String floor:String defaultAddress:Boolean block:String
 * building:String houseNumber:String streetAddress1:String streetAddress2:String streetAddress3:String
 * townCity:String villageArea:String district:String provinceState:String country:String areaCode:String
 * landMark:String pinCode:String addressType:AddressType referenceId:ID  }
 *
 * going out
 * { country:String pinCode:String provinceState:String townCity:String
 *  villageArea:String houseNumber:String flatNumber:String landMark:String streetAddress:String }
 *
 * for now we assume adress willuse the following shape
 * { pinCode provinceState townCity flat villageArea houseNumber landMark }
 *
 */
export const mapGQLAddressResponseToCache = (data) => {
  let addressForCache = {
    pinCode: data?.pinCode,
    provinceState: data?.provinceState,
    townCity: data?.townCity,
    flatNumber: data?.flat, // another pointless change of variabe names on the backend
    villageArea: data?.villageArea,
    houseNumber: data?.houseNumber,
    landMark: data?.landMark,
  };

  return addressForCache;
};

/**
 * new variants data type shape
 *
 * type Variant {
    optionGroupId: ID
    initialItemsCount: Int
    itemsAvailable: Int
    itemsSold: Int
    optionsGroupPrice: Float
    optionsGroupDiscount:Float
    sku: String
    defaultOptionGroup: Boolean
    options: [KeyValuePair]
}
 *
 * "variants" : [ {
        "initialItemsCount" : 10,
        "itemsAvailable" : 7,
        "itemsSold" : null,
        "optionGroupId" : "f7570204-d04a-4677-abf6-bae78690ad37",
        "optionsGroupDiscount" : 5.0,
        "optionsGroupPrice" : 12.1,
        "sku" : null,
        "options" : [ {
          "key" : "lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in",
          "value" : " aliquip ex ea commodo consequat. Duis aute irure dolor"
        }, {
          "key" : "lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in",
          "value" : "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exe"
        } ]
      } ]
 *
 *
 */

let sizeVariant = {
  initialItemsCount: 10,
  itemsAvailable: 7,
  itemsSold: null,
  optionGroupId: "f7570204-d04a-4677-abf6-bae78690ad1",
  optionsGroupDiscount: 5.0,
  optionsGroupPrice: 12.1,
  defaultOptionGroup: true,
  sku: null,
  options: [
    {
      key: "size1",
      value: "256",
    },
    {
      key: "size2",
      value: "512",
    },
    {
      key: "size3",
      value: "1024",
    },
  ],
};

let colorVariant = {
  initialItemsCount: 10,
  itemsAvailable: 7,
  itemsSold: null,
  optionGroupId: "f7570204-d04a-4677-abf6-bae78690ad2",
  optionsGroupDiscount: 5.0,
  optionsGroupPrice: 12.1,
  sku: null,
  defaultOptionGroup: false,
  options: [
    {
      key: "color1",
      value: "red",
    },
    {
      key: "color2",
      value: "green",
    },
    {
      key: "color3",
      value: "blue",
    },
  ],
};
