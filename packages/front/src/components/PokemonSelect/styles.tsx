import styled from 'styled-components';

const POKEMON_ITEM_SIZE = '50px';
const VISIBLE_ROWS = '5.5';

export const PokemonList = styled.ul`
  width: auto;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  padding: 0;
  margin: 0;
  height: calc(${VISIBLE_ROWS} * ${POKEMON_ITEM_SIZE});
  overflow-y: auto;
`;

export const PokemonItem = styled.li<{ selected: boolean }>`
  width: ${POKEMON_ITEM_SIZE};
  height: ${POKEMON_ITEM_SIZE};
  cursor: pointer;

  display: flex;
  flex-direction: column;

  border-radius: 1000px;
  ${(props) => props.selected && `background-color: lightblue;`}
  img {
    width: 100%;
  }
`;
