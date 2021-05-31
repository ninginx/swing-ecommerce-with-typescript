import { VFC } from "react";
import { Container, Wrap, WrapItem } from "@chakra-ui/react";
import Product from "./product";

const Products: VFC = () => (
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
      <WrapItem p={4}>
        <Product />
      </WrapItem>
    </Wrap>
  </Container>
);

export default Products;
