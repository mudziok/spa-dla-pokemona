import styled from 'styled-components';

export const FlexCenteredColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: center;
  gap: 1rem;
`;

export const FlexLi = styled.li`
  display: flex;
`;

export const GridForm = styled.form`
  display: grid;
  grid-template-columns: 3fr 6fr;

  @media (max-width: 450px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr auto;
  }
`;
