import { WagmiConfig } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import wagmiClient from "../wagmiClient";
import { Layout } from "../components/Layout/Layout";

import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
