import { makeAutoObservable, runInAction } from "mobx";
import { TabbarItem } from "../Navigation/TabBar";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from "react-native-restart";

interface AlertButtonProps {
  title: string;
}
interface ICurrentRouteprops {
  currentPage?: string;
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
      properties: ["mode"],
      storage: AsyncStorage,
      expireIn: 86400000 * 30,
      stringify: true,
    });
  }
  mode: { url: string; title: string } = {
    url: "https://api.salamislicing.in/",
    title: "Production",
  };
  router: TabbarItem = TabbarItem.ExploreScreen;
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
  switchMode = () => {
    if (this.mode.url === "https://api.salamislicing.in/") {
      this.mode = {
        url: "https://api.salamislicing.in/",
        title: "Production",
      };
    } else {
      this.mode = {
        url: "https://api.salamislicing.in/",
        title: "Production",
      };
    }
  };
  updateRoute = (route: TabbarItem) => {
    this.router = route;
  };
}

export const appStore = new AppStore();
