module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: [1, "double"],
    "react-native/no-inline-styles": 0,
    "prettier/prettier": [
      "error",
      {
        "no-inline-styles": false,
      },
    ],
  },
};
