import { configureChains, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import {
    iotexMainnetChain,
    iotexTestnetChain,
} from "./config/iotexChainConfig";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
    [iotexMainnetChain, iotexTestnetChain],
    [
        jsonRpcProvider({
            rpc: (chain) => {
                if (
                    chain.id !== iotexMainnetChain.id &&
                    chain.id !== iotexTestnetChain.id
                )
                    return null;
                return { http: chain.rpcUrls.default.http[0] }
            },
        }),
        publicProvider(),
    ]
);

const metamaskConnector = new MetaMaskConnector({
    chains,
});

export default createClient({
    autoConnect: true,
    connectors: [metamaskConnector],
    provider,
});