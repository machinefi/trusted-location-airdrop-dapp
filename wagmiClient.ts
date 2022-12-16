import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
 [mainnet],
 [publicProvider()],
)

export default createClient({
 autoConnect: true,
 provider,
 webSocketProvider,
})
