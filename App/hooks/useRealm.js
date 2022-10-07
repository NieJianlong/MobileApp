import { useEffect, useState } from "react";
import { createModel } from "hox";
import { RealmConnector } from "../db/connector";
import Realm from "realm";

const useRealm = () => {
  const [realm, setRealm] = useState();
  useEffect(() => {
    if (!realm) {
      Realm.open(RealmConnector).then((crealm) => {
        setRealm(crealm);
      });
    }
  }, [realm]);
  return {
    realm,
    setRealm,
  };
};

export default createModel(useRealm);
