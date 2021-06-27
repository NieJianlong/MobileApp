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
      photoUrls:
        element.photoUrls.length !== 0 ? element.photoUrls : photoUrlsM,
      productName: element.shortName,
      rating: element.rating ? element.rating : 75,
      numberOfReviews: element.numberOfReviews ? element.numberOfReviews : 75,
      wholesalePrice: element.wholeSalePrice ? element.wholeSalePrice : 200,
      retailPrice: element.retailPrice ? element.retailPrice : 250,
      percentOff: element.percentOff ? element.percentOff : 30,
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
      hidePickUpFromSeller: hidePickUpFromSeller,
      selectedProductVariants: [], // a list of strings that are groupid's
      selectedProductVariantsValues: [], // a list of strings that are groupid's selected values
    };
    pList.push(bag);
  }
  return pList;
};

/**
 *  pinCode  provinceState townCity villageArea houseNumber flat landMark
 */
export const mapGQLAddressToDelivery = (data) => {
  let address = "";
  if (data.provinceState) {
    address = data.provinceState;
  } else if (data.townCity) {
    address = address + " " + data.townCity;
  }
  if (data.pinCode) {
    address = address + " " + data.pinCode;
  }

  return address;
};

export const mapGQLAddressToLine2 = (data) => {
  let address = "";

  if (data.villageArea) {
    address = address + " " + data.villageArea;
  }

  if (data.houseNumber) {
    address = address + " " + data.houseNumber;
  }

  if (data.flat) {
    address = address + " " + data.flat;
  }

  if (data.landMark) {
    address = address + " " + data.landMark;
  }

  return address;
};
