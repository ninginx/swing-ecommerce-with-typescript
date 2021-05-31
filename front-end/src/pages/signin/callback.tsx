import { Box } from "@chakra-ui/react";
import { VFC, useEffect } from "react";
import AuthService from "../../lib/auth";

const Callback: VFC = () => {
  useEffect(() => {
    const userInfo = async () => {
      const auth = new AuthService();
      const idToken = await auth.idTokenExchange();
      console.log(idToken);
    };
    userInfo();
  }, []);

  return <Box>ログイン中です</Box>;
};

export default Callback;
