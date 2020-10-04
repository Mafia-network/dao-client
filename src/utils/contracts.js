import Web3 from "web3";
import store from "../store";

/**
 *
 * @param abi
 * @returns {Promise<unknown>}
 */
export const deployer = abi =>
  new Promise((resolve, reject) => {
    try {
      const web3 = new Web3(window.web3.currentProvider);
      const contract = new web3.eth.Contract(abi);
      const base = {
        gas: store.state.gas.limit,
        gasPrice: store.state.gas.price,
        from: store.state.web3.coinbase
      };
      resolve({ contract, base });
    } catch (e) {
      reject(e);
    }
  });

/**
 *
 * @param abi
 * @param address
 * @returns {Promise<unknown>}
 */
export const handler = (abi, address) =>
  new Promise((resolve, reject) => {
    try {
      const web3 = new Web3(window.web3.currentProvider);
      const contract = new web3.eth.Contract(abi, address);
      const base = {
        // gas: store.state.gas.limit,
        // gasPrice: store.state.gas.price,
        from: store.state.web3.coinbase
      };
      resolve({ contract, base });
    } catch (e) {
      reject(e);
    }
  });

/**
 *
 * @param address
 * @returns {boolean}
 */
export const isAddress = address => {
  const web3 = new Web3(window.web3.currentProvider);
  return web3.utils.isAddress(address);
};

/**
 *
 * @param address
 * @returns {boolean}
 */
export const isZeroAddress = address => {
  return address === "0x0000000000000000000000000000000000000000";
};

/**
 *
 * @param num
 * @returns {string}
 */
export const numberToHex = num => {
  const web3 = new Web3(window.web3.currentProvider);
  return web3.utils.numberToHex(num);
};

/**
 *
 * @param txHash
 * @returns {Promise<unknown>}
 */
export const getTxStatus = txHash =>
  new Promise((resolve, reject) => {
    const web3 = new Web3(window.web3.currentProvider);
    web3.eth.getTransactionReceipt(txHash, (error, result) => {
      if (!error) {
        if (result === null) {
          resolve(null);
        } else {
          resolve(result);
        }
      } else {
        reject(error);
      }
    });
  });
