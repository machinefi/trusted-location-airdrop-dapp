import { Chain } from "wagmi";

const blockExplorer = {
    name: 'IotexScan',
    url: 'https://iotexscan.io'
}

const blockExplorerTestNet = {
    name: 'IotexScan',
    url: 'https://testnet.iotexscan.io/'
}

export const iotexTestnetChain: Chain = {
    name: 'IoTeX Testnet',
    network: "iotex",
    id: 4690,
    nativeCurrency: {
        decimals: 18,
        name: 'IOTX',
        symbol: 'IOTX'
    },
    rpcUrls: {
        default: {
            http: ['https://babel-api.testnet.iotex.io']
        }
    },
    blockExplorers: {
        etherscan: blockExplorerTestNet,
        default: blockExplorerTestNet
    },
    testnet: true
};

export const iotexMainnetChain: Chain = {
    name: 'IoTeX Mainnet',
    network: "iotex",
    id: 4689,
    nativeCurrency: {
        decimals: 18,
        name: 'IOTX',
        symbol: 'IOTX'
    },
    rpcUrls: {
        default: {
            http: ['https://babel-api.mainnet.iotex.io/']
        }
    },
    blockExplorers: {
        etherscan: blockExplorer,
        default: blockExplorer
    },
    testnet: false
};