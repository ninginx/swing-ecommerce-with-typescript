import { VFC, useState } from 'react';

import Profile from '../presentational/profile';

const EnhancedProfile: VFC = () => {
  const [isLogin] = useState(false);

  return <Profile isLogin={isLogin} />;
};

export default EnhancedProfile;
