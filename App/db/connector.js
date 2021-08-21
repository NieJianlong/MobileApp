import { Address } from "./schemas/Address";
import { KeyValuePair } from "./schemas/KeyValuePair";
import { ListingVariantView } from "./schemas/ListingVariantView";
import { ProductSchema } from "./schemas/ProductSchema";
import { ProductReturnPolicyView } from "./schemas/ProductReturnPolicyView";
import { RatingDetail } from "./schemas/RatingDetail";
import { ReviewView } from "./schemas/ReviewView";
import { SellerView } from "./schemas/SellerView";
import { ShoppingCart } from "./schemas/ShoppingCart";
import { CartInfo } from "./schemas/CartInfo";

export const DB = "mobile.realm";
export const RealmConnector = {
  path: DB,
  schema: [
    Address,
    KeyValuePair,
    ListingVariantView,
    ProductReturnPolicyView,
    RatingDetail,
    ReviewView,
    SellerView,
    ProductSchema,
    ShoppingCart,
    CartInfo,
  ],
  schemaVersion: 0,
  deleteRealmIfMigrationNeeded: true,
};

export function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
