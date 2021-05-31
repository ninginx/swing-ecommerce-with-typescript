import { VFC } from "react";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";

type Props = {
  openSidebar: () => void;
  isMobile: boolean | undefined;
};

const Header: VFC<Props> = ({ openSidebar, isMobile }: Props) => {
  const padding = 4;

  return (
    <Flex bg="blue.200" w="100%">
      {!isMobile && (
        <Box p={padding}>
          <Button onClick={openSidebar}>三</Button>
        </Box>
      )}
      <Box p={padding}>tarozon</Box>
      <Spacer />
      <Box p={padding}>検索ボックス</Box>
      <Spacer />
      <Box p={padding}>プロフィール</Box>
      <Box p={padding}>注文履歴</Box>
      <Box p={padding}>カート</Box>
    </Flex>
  );
};

export default Header;
