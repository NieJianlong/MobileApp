export const Address = {
  name: "Address",
  primaryKey: "id",
  properties: {
    listingId: "string",
    variantId: "string",
    productId: "string",
    defaultVariant: "bool",
    retailPrice: "float",
    wholeSalePrice: "float",
    fullPath: "string",
    itemsInStock: "int",
    itemsAvailable: "int",
    itemsSold: "int",
    options: "KeyValuePair[]",
  },
};
