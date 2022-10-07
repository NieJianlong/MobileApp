import { AppConfig, AuthConfig } from "../config";
import jwtDecode from "jwt-decode";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { accessToken } from "../global/tokenManager";
import NetInfo from "@react-native-community/netinfo";
import { appStore } from "../mobx/app.store";

export const factory = axios.create({
  timeout: 30000,
  baseURL: AppConfig.BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
});

factory.interceptors.request.use(
  async (config) => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      appStore.setNetworkStatus(false);

      return;
    }
    appStore.setNetworkStatus(true);
    try {
      if (!config.headers.Authorization && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (e) {
      console.log(e);
      //Not logged in
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

factory.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export interface FileProps {
  mimeType: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}
export async function UploadFile(file: FileProps) {
  let pdfFile = {
    uri: file.uri,
    type: file.mimeType,
    name: file.name,
  };
  let data = new FormData();
  data.append("type", "File");
  data.append("thumbnail", "false");
  data.append("file", pdfFile);
  try {
    let result1 = await factory.post(
      AppConfig.BaseUrl + "/portal/upload",
      data,
      {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          alert;
        },
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result1.data;
  } catch (error) {
    return error;
  }
}

export interface ResponseProps {
  code: number;
  message: string;
}

export enum FileType {
  Folder = "Folder",
  File = "File",
}

export interface MetadataProps {
  contentType: string;
  contentCreatedAt: number;
  contentModifiedAt: number;
  size: number;
  contentHash?: string;
}
export interface FileInfoProps {
  name: string;
  type: FileType;
  parentId?: string;
  url?: string;
  thumbnailUrl?: string;
  metadata?: MetadataProps;
}

export enum UploadType {
  User = "User",
  File = "File",
}
export async function SaveFile(file: FileInfoProps) {
  try {
    let result1 = await factory.post(AppConfig.BaseUrl + "/files", file);
    return result1.data;
  } catch (error) {
    return { error };
  }
}

export interface GetFilesFilter {
  parentId?: string;
  pageNumber?: number;
  pageSize?: number;
}
export async function GetFiles(filter: GetFilesFilter) {
  try {
    let result = await factory.get(AppConfig.BaseUrl + "/files", {
      params: filter,
    });
    return result.data;
  } catch (error) {
    return { error };
  }
}

// export default {
//   PostAxios,
//   GetAxios,
//   UploadFile,
// };

// export default factory;
