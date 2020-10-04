import Web3 from "web3";

/**
 *
 * @returns {Promise<unknown>}
 */
export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    const ethereumjs = window.ethereum;
    if (typeof ethereumjs !== "undefined") {
      window.ethereum
        .enable()
        .then(accounts => {
          resolve(accounts);
        })
        .catch(() => {
          reject("User rejected provider access to MetaMask");
        });
    } else {
      reject("Unable to connect to Metamask");
    }
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        const web3js = window.web3;
        if (typeof web3js !== "undefined") {
          let web3 = new Web3(web3js.currentProvider);
          resolve({
            web3() {
              return web3;
            }
          });
        } else {
          reject("Unable to connect to Metamask");
        }
      });
    })
    .then(result => {
      return new Promise((resolve, reject) => {
        result
          .web3()
          .eth.net.isListening()
          .then(injectedWeb3 => {
            if (injectedWeb3) {
              result = Object.assign({}, result, { injectedWeb3 });
              resolve(result);
            } else {
              reject("Unable to connect web3");
            }
          });
      });
    })
    .then(result => {
      return new Promise((resolve, reject) => {
        result
          .web3()
          .eth.net.getId()
          .then(networkId => {
            if (networkId) {
              result = Object.assign({}, result, { networkId });
              resolve(result);
            } else {
              reject("Unable to retrieve network ID");
            }
          });
      });
    })
    .then(result => {
      return new Promise((resolve, reject) => {
        result
          .web3()
          .eth.getCoinbase()
          .then(coinbase => {
            if (coinbase) {
              result = Object.assign({}, result, { coinbase });
              resolve(result);
            } else {
              reject("Unable to retrieve coinbase");
            }
          });
      });
    })
    .then(result => {
      return new Promise((resolve, reject) => {
        result
          .web3()
          .eth.getBalance(result.coinbase)
          .then(balance => {
            if (balance) {
              result = Object.assign({}, result, { balance });
              resolve(result);
            } else {
              reject(
                `Unable to retrieve balance for address: ${result.coinbase}`
              );
            }
          });
      });
    });
