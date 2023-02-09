import { configureChains, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import {
    iotexTestnet,
} from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
    [iotexTestnet],
    [
        jsonRpcProvider({
            rpc: (chain) => {
                if (
                    chain.id !== iotexTestnet.id
                ) {
                    return null;
                }

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