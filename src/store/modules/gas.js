import { ls, STORAGE_KEY } from "../plugins";

let syncedData = {
  gas: {
    limit: 3000000,
    price: 1000000000
  }
};
if (ls.get(STORAGE_KEY)) {
  try {
    syncedData = ls.get(STORAGE_KEY);
  } catch (e) {
    console.log(e);
  }
}

export const state = {
  ...syncedData.gas
};

export const getters = {};

export const mutations = {
  UPDATE_GAS(state, payload) {
    state.price = payload.price || state.price;
    state.limit = payload.limit || state.limit;
  },
  RESET_GAS(state) {
    state.price = 0;
    state.limit = 0;
  }
};

export const actions = {
  update({ commit }, payload) {
    commit("UPDATE_GAS", payload);
  },
  reset({ commit }) {
    commit("RESET_GAS");
  }
};
