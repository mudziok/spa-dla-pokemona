import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
};
