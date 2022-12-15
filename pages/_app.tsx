import { ChakraProvider } from '@chakra-ui/react'
import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link";
import { Layout } from "../containers/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
