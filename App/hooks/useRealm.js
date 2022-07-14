import { useEffect, useState } from "react";
import { createModel } from "hox";

const useRealm = () => {
  const [realm, setRealm] = useState();
  useEffect(() => {
    if (!realm) {
    }
  }, [realm]);
  return {
    realm,
    setRealm,
  };
};

export default createModel(useRealm);
