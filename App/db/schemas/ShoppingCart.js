export const ShoppingCart = {
  name: "ShoppingCart",
  primaryKey: "id",
  properties: {
    id: "string",
    product: "ProductSchema",
    quantity: "int",
    created: "date",
    updated: "date",
  },
};
