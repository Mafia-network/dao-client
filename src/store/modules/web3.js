import { ls, STORAGE_KEY } from "../plugins";
import { getWeb3 } from "../../utils/getWeb3.js";
import pollWeb3 from "../../utils/pollWeb3";

let syncedData = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: "",
    balance: 0,
    error: null,
    timer: null
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
  ...syncedData.web3
};

export const getters = {};

export const mutations = {
  REGISTER_WEB3(state, payload) {
    let result = payload;
    let web3Copy = state;
    web3Copy.coinbase = result.coinbase;
    web3Copy.networkId = result.networkId;
    web3Copy.balance = parseInt(result.balance, 10);
    web3Copy.isInjected = result.injectedWeb3;
    web3Copy.web3Instance = result.web3;
    web3Copy.timer = null;
    state = web3Copy;
    state.timer = pollWeb3();
  },
  UPDATE_WEB3(state, payload) {
    state.isInjected = payload.isInjected;
    state.coinbase = payload.coinbase;
    state.balance = parseInt(payload.balance, 10);
  },
  CLEAR_WEB3_POLLING(state) {
    clearInterval(state.timer);
  },
  RESET_WEB3(state) {
    state.isInjected = false;
    state.web3Instance = null;
    state.networkId = null;
    state.coinbase = "";
    state.balance = 0;
    state.error = null;
    state.timer = null;
  }
};

export const actions = {
  register({ commit }) {
    getWeb3()
      .then(payload => {
        console.log("committing result to REGISTER_WEB3 mutation");
        commit("REGISTER_WEB3", payload);
      })
      .catch(e => {
        console.log("error in action web3/register", e);
        swal({
          title: "Metamask Error",
          text: `1. Please install metamask on your browser.\n
                 2. Please make sure to connect this site to the account.`,
          icon: "warning"
        });
      });
  },
  update({ commit }, payload) {
    console.log("committing result to UPDATE_WEB3 mutation");
    commit("UPDATE_WEB3", payload);
  },
  clearPolling({ commit }) {
    commit("CLEAR_WEB3_POLLING");
  },
  reset({ commit }) {
    console.log("committing result to RESET_WEB3 mutation");
    commit("RESET_WEB3");
  }
};
