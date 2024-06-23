// store/cart.js
export const state = () => ({
  items: JSON.parse(localStorage.getItem("cartitems")) || [],
});

export const mutations = {
  ADD_ITEM(state, item) {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity + item.quantity <= item.stock) {
        existingItem.quantity += item.quantity;
      } else {
        alert("Stok miktarını aştınız. Daha fazla ekleyemezsiniz.");
      }
    } else {
      if (item.quantity <= item.stock) {
        state.items.push(item);
      } else {
        alert("Stok miktarını aştınız. Daha fazla ekleyemezsiniz.");
      }
    }
    state.items = state.items.map((item) => ({
      ...item,
      shippingCost: item.price < 150 ? 45 : 0,
    }));
    localStorage.setItem("cartitems", JSON.stringify(state.items));
  },
  REMOVE_ITEM(state, itemid) {
    state.items = state.items.filter((item) => item.id !== itemid);
    localStorage.setItem("cartitems", JSON.stringify(state.items));
  },
  CLEAR_CART(state) {
    state.items = [];
    localStorage.setItem("cartitems", JSON.stringify(state.items));
  },
  INCREMENT_ITEM_QUANTITY(state, itemid) {
    const item = state.items.find((item) => item.id === itemid);
    if (item) {
      if (item.quantity + 1 <= item.stock) {
        item.quantity += 1;
      } else {
        alert("Stok miktarını aştınız. Daha fazla ekleyemezsiniz.");
      }
    }
    state.items = state.items.map((item) => ({
      ...item,
      shippingcost: item.price < 200 ? 45 : 0,
    }));
    localStorage.setItem("cartitems", JSON.stringify(state.items));
  },
  DECREMENT_ITEM_QUANTITY(state, itemid) {
    const item = state.items.find((item) => item.id === itemid);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
    state.items = state.items.map((item) => ({
      ...item,
    }));
    localStorage.setItem("cartitems", JSON.stringify(state.items));
  },
};

export const actions = {
  additem({ commit }, item) {
    commit("ADD_ITEM", {
      id: item.id,
      title: item.title,
      stock: item.stores[0].stock,
      price: item.stores[0].saleprice
        ? item.stores[0].saleprice
        : item.stores[0].listprice,
      mainid: item.mainid,
      store: {
        id: item.stores[0].store.id,
        name: item.stores[0].store.name,
        logo: item.stores[0].store.logo,
        slug: item.stores[0].store.slug,
      },
      varianter: item.varianter,
      slicer: item.slicer,
      brand: item.brand,
      image: item.images[0],
      quantity: 1,
      shippingcost:
        (item.stores[0].saleprice
          ? item.stores[0].saleprice
          : item.stores[0].listprice) < 200
          ? 45
          : 0,
    });
  },
  removeitem({ commit }, itemid) {
    commit("REMOVE_ITEM", itemid);
  },
  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
  incrementitemquantity({ commit }, itemid) {
    commit("INCREMENT_ITEM_QUANTITY", itemid);
  },
  decrementitemquantity({ commit }, itemid) {
    commit("DECREMENT_ITEM_QUANTITY", itemid);
  },
};

export const getters = {
  cartitems: (state) => state.items,
  carttotalprice: (state) => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity + item.shippingCost,
      0
    );
  },
  carttotalquantity: (state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
  totalshippingcost: (state) => {
    return state.items.reduce((total, item) => total + item.shippingCost, 0);
  },
};
