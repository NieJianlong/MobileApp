export const ShoppingCart = {
  name: "ShoppingCart",
  primaryKey: "id",
  properties: {
    id: "string",
    productId: { type: "string", default: "" },
    variantId: { type: "string", default: "" },
    quantity: "int",
    variant: { type: "ListingVariantView?", default: null },
    isDraft: { type: "bool", default: true },
    addressId: { type: "string", default: "" },
    product: "ProductSchema",
    created: "date",
    updated: "date",
  },
};

// cartInfo: { type: "list", objectType: "CartInfo", default: null },
