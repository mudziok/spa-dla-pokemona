import React, { useContext } from 'react';

import { UserContext } from '../../context/userContext';

export const Navigation = () => {
  const { user } = useContext(UserContext);

  return <div>{user}</div>;
};
