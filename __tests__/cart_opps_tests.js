jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);

// yarn jest -t "test data shape co"
it("test data shape co", async () => {
  const initialState = {
    datas: [0, 1, 2, 3, 4].map((item, index) => ({
      id: index,
      name: "iPhone 11",
      picture:
        "https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000",
      rating: 3.0,
      ratingCount: 124,
      retailPrice: 2345,
      wholesalePrice: 1542,
      orderClose: "22/12/2020",
      inStock: 100,
      orderCount: 24,
      count: 1,
    })),
  };

  console.log(initialState.datas.length);
});
