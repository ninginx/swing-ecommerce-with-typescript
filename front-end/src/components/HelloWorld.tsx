import { Box, Button, Text } from "@chakra-ui/react";
import { VFC } from "react";

const HelloWorld: VFC = () => (
  <Box
    p={10}
    my={100}
    colorScheme="green"
    background={{ base: "white.100", md: "red.100" }}
  >
    background=blue.100 borderColor=teal.300 color=green.800
    <Button colorScheme="red">Green Button</Button>
    <Text _hover={{ color: "red.500", fontSize: "xl" }}>Hover mie</Text>
    <Box _before={{ content: `"「"` }} _after={{ content: `"」"` }}>
      aaaaa
    </Box>
  </Box>
);
export default HelloWorld;
