export const CartInfo = {
  name: "CartInfo",
  properties: {
    quantity: "int",
    variant: { type: "ListingVariantView?", default: null },
    isDraft: { type: "bool", default: true },
    addressId: { type: "string", default: "" },
  },
};
