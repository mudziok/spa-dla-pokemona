import { createContext, useEffect, useState } from 'react';

import { ContextProvider } from './composeProviders';

interface OnlineContextType {
  isOnline: boolean;
}

const OnlineContext = createContext<OnlineContextType>(null!);

const OnlineProvider: ContextProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const value: OnlineContextType = { isOnline };

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  });

  return (
    <OnlineContext.Provider value={value}>{children}</OnlineContext.Provider>
  );
};

export { OnlineProvider, OnlineContext };
