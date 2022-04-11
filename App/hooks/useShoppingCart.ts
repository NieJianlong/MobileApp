import { useState } from "react";
import { createModel } from "hox";
import colors from "../Themes/Colors";
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import { nanoid } from "nanoid";
import {
  ListingVariantViewFieldFragment,
  ProductListingViewFieldFragment,
} from "../../generated/graphql";
import { isEmpty, isEqual, uniqWith } from "lodash";

interface ShoppingCartOriginalProps {
  id: string;
  listingId: string;
  productId: string;
  variantId: string;
  quantity: number;
  variant: ListingVariantViewFieldFragment;
  isDraft: boolean;
  addressId: string;
  product: ProductListingViewFieldFragment;
  created: Date;
  updated: Date;
}

interface Props {
  shoppingcartList: ShoppingCartOriginalProps[];
  currentProdcutShoppingInfo: ShoppingCartOriginalProps | undefined;
}
interface ShoppingCartProps {
  id: string;
  listingId: string;
  productId: string;
  variantId: string;
  quantity: number;
  variant: string;
  isDraft: boolean;
  addressId: string;
  product: string;
  created: Date;
  updated: Date;
}
const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<Props>({
    shoppingcartList: [],
    currentProdcutShoppingInfo: undefined,
  });

  const openDatabase = () => {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
  };
  const addProduct = (params: ShoppingCartProps) => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "insert into ShoppingCart (id, listingId, productId, variantId, quantity, variant, isDraft, addressId, product, created, updated) values (?, ?,?,?,?,?,?,?,?,?,?)",
        [
          params.id,
          params.listingId,
          params.productId,
          params.variantId,
          params.quantity,
          params.variant,
          params.isDraft,
          params.addressId,
          params.product,
          params.created,
          params.updated,
        ],
        (_, { rows: { _array } }) => {
          debugger;
        }
      );
      tx.executeSql(
        `select * from ShoppingCart where addressId = ? AND quantity >0 AND isDraft = false;`,
        [params.addressId],
        (_, { rows: { _array } }) => {
          const items = _array.map((item) => {
            return {
              ...item,
              product: JSON.parse(item.product),
              variant: JSON.parse(item.variant),
            };
          });
          setShoppingCart({ ...shoppingCart, shoppingcartList: items });
        }
      );
    });
    // tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
  };

  const deleteProduct = (id: string, addressId: string) => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "delete from ShoppingCart where id = ?",
        [id],
        (_, { rows: { _array } }) => {
          debugger;
        }
      );
      tx.executeSql(
        `select * from ShoppingCart where addressId = ? AND quantity >0 AND isDraft = false;`,
        [addressId],
        (_, { rows: { _array } }) => {
          const items = _array.map((item) => {
            return {
              ...item,
              product: JSON.parse(item.product),
              variant: JSON.parse(item.variant),
            };
          });
          setShoppingCart({ ...shoppingCart, shoppingcartList: items });
        }
      );
    });
    // tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
  };
  //   const info = realm
  //   .objects("ShoppingCart")
  //   .filtered("product.listingId == $0", product.listingId)
  //   .filtered("addressId == $0", localCartVar.deliverAddress)
  //   .filtered("variant.variantId == $0", currentVariant?.variantId)[0];
  const queryProductInfoInDB = (
    listingId: string,
    addressId: string,
    variantId: string
  ) => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ShoppingCart where listingId = ? AND addressId = ? AND variantId = ?;`,
        [listingId, addressId, variantId],
        (_, { rows: { _array } }) => {
          if (isEmpty(_array)) {
            const items = _array.map((item) => {
              return {
                ...item,
                product: JSON.parse(item.product),
                variant: JSON.parse(item.variant),
              };
            });
            setShoppingCart({
              ...shoppingCart,
              currentProdcutShoppingInfo: items[0],
            });
          } else {
            setShoppingCart({
              ...shoppingCart,
              currentProdcutShoppingInfo: undefined,
            });
          }
        }
      );
    });
  };
  //   const query = realm
  //   .objects("ShoppingCart")
  //   .filtered("addressId == $0", localCart.deliverAddress)
  //   .filtered("quantity > 0")
  //   .filtered("isDraft == false");
  const queryShoppingCart = (addressId: string) => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ShoppingCart where addressId = ? AND quantity >0 AND isDraft = false;`,
        [addressId],
        (_, { rows: { _array } }) => {
          const items = _array.map((item) => {
            return {
              ...item,
              product: JSON.parse(item.product),
              variant: JSON.parse(item.variant),
            };
          });
          setShoppingCart({
            ...shoppingCart,
            shoppingcartList: uniqWith(items, isEqual),
          });
        }
      );
    });
  };

  const { shoppingcartList, currentProdcutShoppingInfo } = shoppingCart;
  return {
    deleteProduct,
    openDatabase,
    queryShoppingCart,
    queryProductInfoInDB,
    addProduct,
    shoppingCart,
    setShoppingCart,
    shoppingcartList,
    currentProdcutShoppingInfo,
  };
};

export default createModel(useShoppingCart);
