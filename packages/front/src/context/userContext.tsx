import React, { createContext, useContext, useEffect, useState } from 'react';

import { AxiosPrivateRoutes } from '../utils/axiosPrivate';
import { AuthContext } from './authContext';
import { AxiosContext } from './axiosContext';
import { ContextProvider } from './composeProviders';

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
}

interface UserContextType {
  user: User | null;
}

export const UserContext = createContext<UserContextType>({ user: null });

export const UserContextProvider: ContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { axiosPrivate } = useContext(AxiosContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      axiosPrivate.get(AxiosPrivateRoutes.USER).then((response) => {
        console.log('xd', response);
        setUser(response.data);
      });
    }
  }, [axiosPrivate, token]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
