import { VFC } from 'react';

import Layout from '../components/layout';
import Products from '../components/container/enhancedProducts';

const Home: VFC = () => (
  <Layout>
    <Products />
  </Layout>
);

export default Home;
