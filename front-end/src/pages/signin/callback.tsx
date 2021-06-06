import { Box } from '@chakra-ui/react';
import { VFC, useEffect } from 'react';
import authService from '../../lib/authService';
// import { authSlice, userState } from '../../ducks/authSlice';

// type authCode = {
//   code: string;
// };

const Callback: VFC = () => {
  useEffect(() => {
    const userInfo = async () => {
      const queryParams = new URLSearchParams(
        window.location.search,
      ).toString();
      const params = queryParams.split('&').reduce(
        (prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.split('=')[0]]: currentValue.split('=')[1],
        }),
        {},
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user = await authService.login(params as { code: string });
    };
    void userInfo();
  }, []);

  return <Box>ログイン中です</Box>;
};

export default Callback;
