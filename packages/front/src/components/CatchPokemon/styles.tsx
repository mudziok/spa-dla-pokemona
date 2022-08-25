import styled from 'styled-components';

export const CatchPokemonTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 20rem 2rem;

  @media (max-width: 450px) {
    padding: 1rem;
  }
`;
