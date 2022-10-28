import React, { createContext, useState } from 'react';

import { ContextProvider } from './composeProviders';

interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider: ContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const value = { token, setToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
