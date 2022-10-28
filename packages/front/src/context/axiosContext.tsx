import { createContext, useContext } from 'react';

import { AxiosInstance } from 'axios';

import { axiosPokeApi } from '../utils/axiosPokeApi';
import { axiosPrivate } from '../utils/axiosPrivate';
import { axiosPublic } from '../utils/axiosPublic';
import { AuthContext } from './authContext';
import { ContextProvider } from './composeProviders';

interface AxiosContextValue {
  axiosPublic: AxiosInstance;
  axiosPrivate: AxiosInstance;
  axiosPokeApi: AxiosInstance;
}

export const AxiosContext = createContext<AxiosContextValue>(null!);

export const AxiosProvider: ContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (config && config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <AxiosContext.Provider value={{ axiosPublic, axiosPokeApi, axiosPrivate }}>
      {children}
    </AxiosContext.Provider>
  );
};
