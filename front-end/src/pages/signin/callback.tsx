import { Box } from '@chakra-ui/react';
import { VFC, useEffect } from 'react';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import authService from '../../lib/authService';
import { authSlice } from '../../ducks/authSlice';

const Callback: VFC = () => {
  const dispach = useDispatch();
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
      const loginUserInfo = await authService.login(params as { code: string });
      dispach(
        authSlice.actions.signin({
          id: loginUserInfo.id,
          name: loginUserInfo.name,
          email: loginUserInfo.email,
          isSignin: true,
        }),
      );
      await router.push('/');
    };
    void userInfo();
  }, [dispach]);

  return <Box>ログイン中です</Box>;
};

export default Callback;
