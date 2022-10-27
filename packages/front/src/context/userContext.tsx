import React, { createContext, useContext, useEffect, useState } from 'react';

import { AxiosPrivateRoutes } from '../utils/axiosPrivate';
import { AxiosContext } from './axiosContext';
import { ContextProvider } from './composeProviders';

interface UserContextType {
  user: any;
}

export const UserContext = createContext<UserContextType>({ user: null });

export const UserContextProvider: ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { axiosPrivate } = useContext(AxiosContext);

  useEffect(() => {
    axiosPrivate.get(AxiosPrivateRoutes.USER).then((response) => {
      console.log('xd', response);
      setUser(response.data);
    });
  }, [axiosPrivate, user]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
