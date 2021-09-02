export const ShoppingCart = {
  name: "ShoppingCart",
  primaryKey: "id",
  properties: {
    id: "string",
    quantity: "int",
    variant: { type: "ListingVariantView?", default: null },
    isDraft: { type: "bool", default: true },
    addressId: { type: "string", default: "" },
    // cartInfo: { type: "list", objectType: "CartInfo", default: null },
    product: "ProductSchema",
    created: "date",
    updated: "date",
  },
};
