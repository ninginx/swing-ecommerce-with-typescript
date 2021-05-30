// only allowed ...pageProps in Component
/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
