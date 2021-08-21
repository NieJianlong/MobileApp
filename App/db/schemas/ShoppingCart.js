export const ShoppingCart = {
  name: "ShoppingCart",
  primaryKey: "id",
  properties: {
    id: "string",
    cartInfo: { type: "list", objectType: "CartInfo", default: null },
    product: "ProductSchema",
    created: "date",
    updated: "date",
  },
};
