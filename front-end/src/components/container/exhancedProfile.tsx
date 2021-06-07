import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { userState } from '../../ducks/authSlice';

import Profile from '../presentational/profile';

const EnhancedProfile: VFC = () => {
  const loginUser = useSelector((state: userState) => state);

  return <Profile isLogin={loginUser.isSignin} userName={loginUser.name} />;
};

export default EnhancedProfile;
