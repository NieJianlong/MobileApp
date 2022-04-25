export const productToStateMapper = (product) => {
  let editState = {};
  let selected = {};
  let prodSelVariants = [];
  let prodVariants = [];
  let datas = [];
  if (product.selectedProductVariants.length !== 0) {
    prodSelVariants = product.selectedProductVariants;
  }
  if (product.prodVariants.length !== 0) {
    prodVariants = product.prodVariants;
  }
  for (let sel of prodSelVariants) {
    selected.title = sel.optionGroupId.substring(0, 5);
  }
  editState.selected = selected;
};

export const hardCodedState = {
  selected: {
    Size: "256GB",
    Style: "OnePlus 8",
    Color: "Onyx Black",
  },
  datas: [
    {
      title: "Size",
      data: [
        { title: "256GB", price: "+₹145" },
        { title: "128GB", price: "-₹45" },
      ],
    },
    {
      title: "Style",
      data: [
        { title: "OnePlus 8 Pro", price: "+₹125" },
        { title: "OnePlus 8", price: "-₹45" },
      ],
    },
    {
      title: "Color",
      data: [
        { title: "Onyx Black", price: "+₹125", color: "#292929" },
        { title: "Glaciar Green", price: "-₹45", color: "#96E9E0" },
        { title: "Ultramarine Blue", price: "-₹45", color: "#9CACE5" },
      ],
    },
  ],
};
