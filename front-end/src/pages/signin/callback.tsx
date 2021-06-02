import { Box } from '@chakra-ui/react';
import { VFC, useEffect } from 'react';
import AuthService from '../../lib/auth';
import { authSlice, userState } from '../../ducks/authSlice';

const Callback: VFC = () => {
  useEffect(() => {
    const userInfo = async () => {
      const auth = new AuthService();
      const user = await auth.login();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user: userState = { ...user };
      authSlice.actions.signin(user);
    };
    void userInfo();
  }, []);

  return <Box>ログイン中です</Box>;
};

export default Callback;
