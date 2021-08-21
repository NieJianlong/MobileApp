export const ProductReturnPolicyView = {
  name: "ProductReturnPolicyView",
  primaryKey: "id",
  properties: {
    id: { type: "string?", default: null },
    productId: { type: "string?", default: null },
    name: { type: "string?", default: null },
    description: { type: "string?", default: null },
    value: { type: "string?", default: null },
  },
};
