import Web3 from "web3";
import store from "../store/";

/**
 *
 * @returns {number}
 */
let pollWeb3 = () => {
  let web3 = window.web3;
  web3 = new Web3(web3.currentProvider);

  return setInterval(() => {
    if (!web3) {
      store.dispatch("web3/update", {
        isInjected: false,
        coinbase: "",
        balance: 0
      });
      return false;
    }
    web3.eth.getAccounts().then(accounts => {
      if (!accounts[0] && store.state.web3.isInjected) {
        store.dispatch("web3/update", {
          isInjected: false,
          coinbase: "",
          balance: 0
        });
        return false;
      } else {
        web3.eth.getCoinbase().then(coinbase => {
          web3.eth.getBalance(coinbase).then(newBalance => {
            if (newBalance) {
              store.dispatch("web3/update", {
                isInjected: true,
                coinbase: coinbase,
                balance: newBalance
              });
            }
          });
        });
      }
    });
  }, 5000);
};

export default pollWeb3;
