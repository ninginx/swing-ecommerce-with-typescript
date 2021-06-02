// only allowed ...pageProps in Component
/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from '../ducks/user';

const store = configureStore({ reducer: userSlice.reducer });

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Provider store={store}>
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  </Provider>
);

export default MyApp;
