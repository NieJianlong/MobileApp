import AsyncStorage from '@react-native-community/async-storage';

export const LOCAL_STORAGE_TOKEN_KEY = '@local_storage_token_key'
export const GUEST_BUYER_ID_KEY = '@local_storage_guest_id_key'
export const REGISTER_BUYER_ID_KEY = '@local_storage_register_id_key'

export const setLocalStorageValue = async (key, val) => {
 // console.log(`setLocalStorageValue key:${key} val ${val}`)
 
  try {
    await AsyncStorage.setItem(key, val)
  } catch (err) {
    console.log(`setLocalStorageValue error ${err}`)
  }

}

export const getLocalStorageValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch (err) {
    console.log(`getLocalStorageValue error ${err}`)
  }

  return ' '
}