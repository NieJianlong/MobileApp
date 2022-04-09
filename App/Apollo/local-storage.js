import AsyncStorage from "@react-native-community/async-storage";

export const LOCAL_STORAGE_TOKEN_KEY = "@local_storage_token_key";
export const GUEST_BUYER_ID_KEY = "@local_storage_guest_id_key";
export const REGISTER_BUYER_ID_KEY = "@local_storage_register_id_key";

export const LOCAL_STORAGE_USER_NAME = "@local_storage_user_name";
export const LOCAL_STORAGE_USER_PASSWORD = "@local_storage_user_password";
export const LOCAL_STORAGE_USER_PROFILE = "@local_storage_user_profile";

export const LOCAL_SEARCH_ITEM = "@local_storage_search_items";
export const CURRENT_ADDRESS = "@local_storage_current_address";

export const setLocalStorageValue = async (key, val) => {
  // console.log(`setLocalStorageValue key:${key} val ${val}`)

  try {
    await AsyncStorage.setItem(key, val);
  } catch (err) {
    console.log(`setLocalStorageValue error ${err}`);
  }
};

export const getLocalStorageValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    console.log(`getLocalStorageValue error ${err}`);
  }

  return " ";
};
export const setLocalStorageEmpty = async () => {
  try {
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, "");
    await AsyncStorage.setItem(REGISTER_BUYER_ID_KEY, "");
    await AsyncStorage.setItem(LOCAL_STORAGE_USER_NAME, "");
    await AsyncStorage.setItem(LOCAL_STORAGE_USER_PASSWORD, "");
    await AsyncStorage.setItem(LOCAL_SEARCH_ITEM, "");
    await AsyncStorage.setItem(CURRENT_ADDRESS, "");
    // await AsyncStorage.setItem(GUEST_BUYER_ID_KEY, "");
  } catch (err) {
    console.log(`getLocalStorageValue error ${err}`);
  }

  return " ";
};
