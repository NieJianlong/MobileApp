export const ListingVariantView = {
  name: "ListingVariantView",
  // primaryKey: "listingId",
  properties: {
    listingId: { type: "string?", default: null },
    variantId: { type: "string?", default: null },
    productId: { type: "string?", default: null },
    defaultVariant: "bool",
    retailPrice: { type: "float?", default: null },
    wholeSalePrice: { type: "float?", default: null },
    fullPath: { type: "string?", default: null },
    itemsInStock: { type: "int?", default: null },
    itemsAvailable: { type: "int?", default: null },
    itemsSold: { type: "int?", default: null },
    options: { type: "list", objectType: "KeyValuePair", default: null },
  },
};
