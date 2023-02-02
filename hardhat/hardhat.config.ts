import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const IOTEX_PRIVATE_KEY = process.env.IOTEX_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: "https://babel-api.testnet.iotex.io",
      accounts: [IOTEX_PRIVATE_KEY],
    },
  },
};

export default config;
