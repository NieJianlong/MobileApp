import { Address } from "./schemas/Address";
import { KeyValuePair } from "./schemas/KeyValuePair";
import { ListingVariantView } from "./schemas/ListingVariantView";
import { Product } from "./schemas/Prodcut";
import { ProductReturnPolicyView } from "./schemas/ProductReturnPolicyView";
import { RatingDetail } from "./schemas/RatingDetail";
import { ReviewView } from "./schemas/ReviewView";
import { SellerView } from "./schemas/SellerView";
import { ShoppingCart } from "./schemas/ShoppingCart";

export const DB = "mobile.realm";
export const RealmConnector = {
  path: DB,
  schema: [
    Address,
    KeyValuePair,
    ListingVariantView,
    Product,
    ProductReturnPolicyView,
    RatingDetail,
    ReviewView,
    SellerView,
    ShoppingCart,
  ],
  schemaVersion: 0,
  deleteRealmIfMigrationNeeded: true,
};
