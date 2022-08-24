import React, { createContext, ReactNode, useState } from 'react';

interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('');

  const value = { token, setToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
