import { Box } from '@chakra-ui/react';
import { VFC, useEffect } from 'react';
import AuthService from '../../lib/auth';
import { authSlice, userState } from '../../ducks/authSlice';

const Callback: VFC = () => {
  useEffect(() => {
    const userInfo = async () => {
      const auth = new AuthService();
      const user = await auth.login();
      console.log(user);
    };
    void userInfo();
  }, []);

  return <Box>ログイン中です</Box>;
};

export default Callback;
