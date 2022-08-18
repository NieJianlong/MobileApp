import React from "react";
import mainStore from "./mainStore";

//创建rootStore的Context
export const rootStoreContext = React.createContext(mainStore);

/**
 * @description 提供hook方式，方便组件内部获取Store
 * @param {*} storeName 组件名字。作用类似inject(storeName)，不传默认返回rootStore
 */
export enum StoreName {
  appStore = "appStore",
}

export const useAppStore = () => {
  const rootStore = React.useContext(rootStoreContext);
  return rootStore.appStore;
};
