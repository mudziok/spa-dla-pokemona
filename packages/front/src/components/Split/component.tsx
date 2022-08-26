import { FC, ReactNode } from 'react';

import { MainContainter, SidebarContainer, SplitGrid } from './styles';

interface SplitProps {
  sidebar?: ReactNode;
  main?: ReactNode;
}

export const Split: FC<SplitProps> = ({ sidebar = <></>, main = <></> }) => {
  return (
    <SplitGrid>
      <SidebarContainer>{sidebar}</SidebarContainer>
      <MainContainter>{main}</MainContainter>
    </SplitGrid>
  );
};
