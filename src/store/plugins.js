export const ls = require("store");
export const STORAGE_KEY = "mafia-network-v2";

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = {
      web3: state.web3,
      gas: state.gas,
    };

    ls.set(STORAGE_KEY, syncedData);
    if (mutation.type === "CLEAR_ALL_DATA") {
      ls.delete(STORAGE_KEY);
    }
  });
};

export default [localStoragePlugin];
