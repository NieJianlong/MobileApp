import { StyleSheet } from "react-native";

import { ApplicationStyles, Colors } from "../../../../Themes";

export default StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  vButton: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: "#00aeef",
    borderRadius: 15,
  },
});
