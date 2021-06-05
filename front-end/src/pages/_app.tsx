// only allowed ...pageProps in Component
/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '../ducks/authSlice';

const store = configureStore({ reducer: authSlice.reducer });

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Provider store={store}>
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  </Provider>
);

export default MyApp;
