export const RatingDetail = {
  name: "RatingDetail",
  // primaryKey: "id",
  properties: {
    id: { type: "string?", default: null },
    productId: { type: "string?", default: null },
    sellerId: { type: "string?", default: null },
    title: { type: "string?", default: null },
    description: { type: "string?", default: null },
    ratingVote: { type: "int?", default: null },
    helpfulCount: { type: "int?", default: null },
    postedBy: { type: "string?", default: null },
  },
};
