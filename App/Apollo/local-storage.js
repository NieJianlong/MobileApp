import AsyncStorage from '@react-native-community/async-storage';

export const LOCAL_STORAGE_TOKEN_KEY = '@local_storage_token_key'

export const setLocalStorageValue = async (key, val) => {

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