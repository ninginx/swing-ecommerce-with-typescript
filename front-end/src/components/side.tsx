import { VFC } from "react";
import { Box, Flex } from "@chakra-ui/react";

const Sidebar: VFC = () => (
  <Flex width={{ base: "100%", md: "15%" }}>
    <Box>side</Box>
  </Flex>
);

export default Sidebar;
