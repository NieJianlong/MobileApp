//"      photo:
// "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",

export const mapProductListingDTO = (data) => {
  let pList = [];
  for (const element of data) {
    let bag = {
      id: element.productId,
      photo: element.photo,
      photoUrls: [element.photo],
      productName: element.productName,
      rating: element.rating,
      numberOfReviews: element.numberOfReviews,
      wholesalePrice: element.wholeSalePrice,
      retailPrice: element.retailPrice,
      percentOff: element.percentOff,
      noOfItemsInStock: element.noOfItemsInStock,
      noOfOrderedItems: element.noOfOrderedItems,
      orderClose: element.closedDate,
      seller: {
        avatar:
          "https://pbs.twimg.com/profile_images/631366930960551936/MswTZv39_400x400.png",
        name: "thegioididong",
        description:
          "Thegioididong.com là thương hiệu thuộc Công ty Cổ phần Thế giới di động, Tên tiếng Anh là Mobile World JSC, (mã Chứng Khoán: MWG) là một tập đoàn bán lẻ tại Việt Nam với lĩnh vực kinh doanh chính là bán lẻ điện thoại di động, thiết bị số và điện tử tiêu dùng[2]. Theo nghiên cứu của EMPEA, thống kê thị phần bán lẻ điện thoại di động tại Việt Nam năm 2014 thì Thế giới di động hiện chiếm 25% và là doanh nghiệp lớn nhất trong lĩnh vực của mình.",
        rating: 4.2,
        ratingCount: 1024,
      },
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
