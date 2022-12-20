require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
const fs = require('fs');
 
const IOTEX_PRIVATE_KEY = process.env.IOTEX_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      gas: 8500000,
    },
    testnet: {
      // These are the official IoTeX endpoints to be used by Ethereum clients
      // Testnet https://babel-api.testnet.iotex.io
      // Mainnet https://babel-api.mainnet.iotex.io
      url: `https://babel-api.testnet.iotex.io`,
 
      // Input your Metamask testnet account private key here
      accounts: [`${IOTEX_PRIVATE_KEY}`],
    },
  },
};
