export const mapProductListingDTO = (data) => {
  let pList = [];
  for (const element of data) {
    let bag = {
      picture:
        "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
      name: element.productName,
      rating: element.rating,
      ratingCount: element.numberOfReviews,
      wholesalePrice: element.wholeSalePrice,
      retailPrice: element.retailPrice,
      inStock: 100,
      orderCount: 24,
      orderClose: element.closedDate,
    };
    pList.push(bag);
  }
  return JSON.stringify(pList);
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
