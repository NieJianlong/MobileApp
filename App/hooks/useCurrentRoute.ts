import { useEffect, useState } from "react";
import { createModel } from "hox";

interface ICurrentRouteprops {
  currentPage?: string;
  pageWhenPopUp?: string;
}
const useCurrentRoute = () => {
  const [currentRoute, setCurrentRoute] = useState<ICurrentRouteprops>();

  return {
    currentRoute,
    setCurrentRoute,
  };
};

export default createModel(useCurrentRoute);
