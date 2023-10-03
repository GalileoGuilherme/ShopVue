const state = {
    selectedProducts: [],
  };
  
  const mutations = {
    SET_SELECTED_PRODUCTS(state, products) {
      state.selectedProducts = products;
    },
  };
  
  const actions = {
    updateSelectedProducts({ commit }, products) {
      commit('SET_SELECTED_PRODUCTS', products);
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
  