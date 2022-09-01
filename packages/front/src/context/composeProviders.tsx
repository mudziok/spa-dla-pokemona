import { FC } from 'react';

export type ContextProvider = FC<{ children: JSX.Element }>;

export const composeProviders = (providers: Array<ContextProvider>) => {
  const ComposedProvider: ContextProvider = ({ children }) =>
    providers.reduceRight((Prev, Curr) => <Curr children={Prev} />, children);
  return ComposedProvider;
};
