import { WagmiConfig } from 'wagmi'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import wagmiClient from "../wagmiClient"
import { Layout } from "../containers/Layout/Layout";

function MyApp({ Component, pageProps }: any) {

  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }

  const theme = extendTheme({ config })

  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </WagmiConfig>

  )
}

export default MyApp
