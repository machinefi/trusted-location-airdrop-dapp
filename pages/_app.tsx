import { WagmiConfig } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import wagmiClient from "../wagmiClient"
import { Layout } from "../containers/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </WagmiConfig>

  )
}

export default MyApp
