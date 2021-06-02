import { VFC, useEffect } from 'react';
import AuthService from '../../lib/auth';

const Redirect: VFC = () => {
  useEffect(() => {
    const signin = () => {
      const auth = new AuthService();
      auth.authorize();
    };
    signin();
  }, []);

  return <div>{/* redirect only */}</div>;
};

export default Redirect;
