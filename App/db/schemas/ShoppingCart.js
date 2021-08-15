export const ShoppingCart = {
  name: "ShoppingCart",
  primaryKey: "id",
  properties: {
    id: "string",
    product: "Product",
    quantity: "int",
    created: "date",
    updated: "date",
  },
};
