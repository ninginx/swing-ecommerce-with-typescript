import { VFC, useState } from "react";
import { VStack, Box, Flex, useBreakpointValue } from "@chakra-ui/react";

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
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack>
      <Header openSidebar={openSidebar} isMobile={isMobile} />
      <Flex w="100%">
        {!isMobile && isOpen && <Sidebar />}
        <Box w={{ base: "100%", md: isOpen ? "85%" : "100%" }}>{children}</Box>
      </Flex>
      <Footer />
    </VStack>
  );
};

export default Layout;
