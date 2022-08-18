import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-community/async-storage";

interface AlertButtonProps {
  title: string;
}
interface ICurrentRouteprops {
  currentPage?: string;
}

interface ShareBoxprops {
  show: boolean;
  type: "file" | "noteBook" | "taggedNoteBook";
  isUploading: boolean;
}
interface AppAlert {
  show: boolean;
  title: string;
  content?: string;
  buttons: Array<AlertButtonProps>;
  color?: string;
}
interface LoadingProps {
  title?: string;
  show: boolean;
  position?: "center" | "right";
}
interface UserInfoProps {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  roles: string[];
}
export default class AppStore {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this);
    makePersistable(this, {
      name: "appStore",
      properties: ["currentUserInfo"],
      storage: AsyncStorage,
      expireIn: 86400000 * 30,
      stringify: true,
    });
  }

  isLogout: boolean = false;
  permissions: Array<string> = [];
  alert: AppAlert = {
    show: false,
    title: "",
    content: "",
    buttons: [],
  };
  currentUserInfo: UserInfoProps | null = null;

  loading: LoadingProps = {
    title: "",
    show: false,
    position: "center",
  };

  showNoteBook: boolean = false;
  showFileDetail: boolean = false;
  showNoteDetail: boolean = false;

  showFileSelector: boolean = false;

  updatePerssions = async () => {
    // const results = await factory.get("/users/permissions");
    // if (results.status === 200) {
    //   this.permissions = results.data;
    // }
  };
}

export const appStore = new AppStore();
