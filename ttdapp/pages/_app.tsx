import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <CSSReset />
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
