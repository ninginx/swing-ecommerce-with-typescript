import { VFC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Product from "./product";

const Products: VFC = () => (
  <Flex>
    <Box>
      <Product />
    </Box>
  </Flex>
);

export default Products;
