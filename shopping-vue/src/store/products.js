const state = {
  selectedProducts: [],
};

const mutations = {
  SET_SELECTED_PRODUCTS(state, products) {
    state.selectedProducts = products;
  },
  
  ADD_OR_EDIT_PRODUCT(state, product) {
    // Verifique se o produto já existe na lista pelo ID
    const existingProductIndex = state.products.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      // Se o produto existir, atualize-o
      state.products[existingProductIndex] = product;
    } else {
      // Caso contrário, adicione-o à lista
      state.products.push(product);
    }
  },
};

const actions = {
  updateSelectedProducts({ commit }, products) {
    commit("SET_SELECTED_PRODUCTS", products);
  },
};

const getters = {
  getSelectedProducts(state) {
    return state.selectedProducts;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
