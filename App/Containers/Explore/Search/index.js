import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { ProductSearchBox } from "../../../Components";
import { Images } from "../../../Themes";
import * as storage from "../../../Apollo/local-storage";
import CategoryAndProductList from "../CategoryAndProductList/Index";
import { t, theme } from "react-native-tailwindcss";
import NavigationService from "../../../Navigation/NavigationService";
import { isEmpty, uniq } from "lodash";

const SearchContext = React.createContext({});

function ProductSearch(props) {
  return (
    <SearchContext.Consumer>
      {({
        recentSearches,
        changeRecentSearches,
        onSearch,
        onShowSearchBox,
        onSetInput,
        searchText,
      }) => (
        <View style={[styles.container, theme.bgWhite]}>
          <View style={[styles.header, theme.mY0]}>
            <ProductSearchBox
              onSetInput={onSetInput}
              keyword={searchText}
              recentSearches={recentSearches}
              changeRecentSearches={changeRecentSearches}
              onSelect={(item) => {
                onSearch(item);
                // NavigationService.goBack();
              }}
              onShowSearchBox={onShowSearchBox}
            />
          </View>

          <View style={styles.body}>
            <Text style={styles.heading5Bold}>Recent searches</Text>

            {recentSearches &&
              recentSearches.map((text, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onSearch(text);
                  }}
                >
                  <View
                    key={index.toString()}
                    style={styles.recentSearchContainer}
                  >
                    <View style={styles.v1}>
                      <Image style={styles.icClock} source={Images.clock} />

                      <Text style={styles.txtSearch}>{text}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        recentSearches.splice(index, 1);
                        storage.setLocalStorageValue(
                          storage.LOCAL_SEARCH_ITEM,
                          JSON.stringify(recentSearches)
                        );
                        const newArray = recentSearches.map((item) => item);
                        changeRecentSearches(newArray);
                      }}
                    >
                      <Image
                        style={styles.icDelete}
                        source={Images.crossMedium}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}
    </SearchContext.Consumer>
  );
}

export default function Index() {
  const [input, setInput] = useState();
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(true);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    let isUnmount = false;
    (async () => {
      try {
        const items = await storage.getLocalStorageValue(
          storage.LOCAL_SEARCH_ITEM
        );
        if (!isUnmount) {
          setRecentSearches(uniq(JSON.parse(items)));
        }
      } catch (error) {
        if (!isUnmount) {
          setRecentSearches([]);
        }
      }
    })();
    return () => (isUnmount = true);
  }, []);
  const changeRecentSearches = useCallback((newValue) => {
    setRecentSearches(newValue);
  }, []);
  const onSearch = useCallback(
    (newText) => {
      setSearchText(newText);
      setShowSearchBox(false);
      if (isEmpty(recentSearches)) {
        setRecentSearches([newText]);
        storage.setLocalStorageValue(
          storage.LOCAL_SEARCH_ITEM,
          JSON.stringify([newText])
        );
      } else {
        if (recentSearches.indexOf(newText) > 0) {
          setRecentSearches([...recentSearches, newText]);
          storage.setLocalStorageValue(
            storage.LOCAL_SEARCH_ITEM,
            JSON.stringify([...recentSearches, newText])
          );
        }
      }
    },
    [recentSearches]
  );
  const onShowSearchBox = useCallback(
    (showBox) => {
      setShowSearchBox(showBox);
      if (showBox && input.current) {
        input.current.focus();
      }
    },
    [input]
  );
  const onSetInput = useCallback(
    (inputT) => {
      setInput(inputT);
      if (showSearchBox && inputT.current) {
        inputT.current.focus();
      }
    },
    [showSearchBox]
  );
  return (
    <SafeAreaView style={[t.bgWhite, { width, height }]}>
      <SearchContext.Provider
        value={{
          recentSearches,
          changeRecentSearches,
          onSearch,
          onShowSearchBox,
          onSetInput,
          searchText,
        }}
      >
        {showSearchBox ? (
          <ProductSearch />
        ) : (
          <View style={[t.bgWhite]}>
            <CategoryAndProductList
              textToSearch={searchText}
              recentSearches={recentSearches}
              changeRecentSearches={changeRecentSearches}
              onSearch={onSearch}
              onShowSearchBox={onShowSearchBox}
            />
          </View>
        )}
      </SearchContext.Provider>
    </SafeAreaView>
  );
}
