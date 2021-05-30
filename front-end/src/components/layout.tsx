import { VFC, useState } from "react";
import { VStack, Box, Flex } from "@chakra-ui/react";

import Header from "./header";
import Sidebar from "./side";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const Layout: VFC<Props> = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const openSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <VStack max-width>
      <Header openSidebar={openSidebar} />
      <Flex w="100%">
        {isOpen && <Sidebar />}
        <Box bg="red.200" w={{ base: "100%", md: isOpen ? "80%" : "100%" }}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </VStack>
  );
};

export default Layout;
