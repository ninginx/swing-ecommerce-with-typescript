import { VFC } from 'react';
import { Container, Wrap, WrapItem } from '@chakra-ui/react';
import Product from './product';

// type Props = {
//   items: []
// }

const Products: VFC = () => (
  // const items =
  <Container maxWidth="100%" centerContent>
    <Wrap>
      <WrapItem p={4}>
        <Product />
      </WrapItem>
      <WrapItem p={4}>
        <Product />
      </WrapItem>
      <WrapItem p={4}>
        <Product />
      </WrapItem>
      <WrapItem p={4}>
        <Product />
      </WrapItem>
      <WrapItem p={4}>
        <Product />
      </WrapItem>
    </Wrap>
  </Container>
);

export default Products;
