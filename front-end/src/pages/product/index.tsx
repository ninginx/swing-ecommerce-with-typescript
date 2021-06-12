import { VFC } from 'react';

import Layout from '../../components/layout';
import Register from '../../components/container/enhancedRegister';
// isLoginRequiredを実装する
const Index: VFC = () => (
  <Layout>
    <Register />
  </Layout>
);
export default Index;
