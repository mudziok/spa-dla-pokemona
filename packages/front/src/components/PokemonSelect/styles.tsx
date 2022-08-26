import styled from 'styled-components';

const POKEMON_ITEM_SIZE = '150px';

export const PokemonList = styled.ul`
  width: auto;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;

  padding: 0;
  margin: 0;
  height: 100%;
`;

export const PokemonItem = styled.li<{ selected: boolean }>`
  width: ${POKEMON_ITEM_SIZE};
  height: ${POKEMON_ITEM_SIZE};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 1000px;
  ${(props) => props.selected && `background-color: lightblue;`}

  img {
    width: 70%;
  }

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.3);
  }
`;
