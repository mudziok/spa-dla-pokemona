import styled from 'styled-components';

export const SplitGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 3fr;
  height: 100vh;

  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

export const SidebarContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  border-right: 3px lightblue solid;

  @media (max-width: 450px) {
    height: auto;
    border-right: none;
    border-bottom: 3px lightblue solid;
  }
`;

export const MainContainter = styled.div`
  height: 100%;
  overflow-y: auto;

  @media (max-width: 450px) {
    height: auto;
  }
`;
