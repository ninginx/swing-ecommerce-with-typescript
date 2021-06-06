import router from 'next/router';
import { VFC, useEffect } from 'react';
import authService from '../../lib/authService';

const Redirect: VFC = () => {
  useEffect(() => {
    const signin = async () => {
      const auth = authService;
      const redirecturi = auth.authorize();
      await router.push(redirecturi);
    };
    void signin();
  }, []);

  return <div>{/* redirect only */}</div>;
};

export default Redirect;
