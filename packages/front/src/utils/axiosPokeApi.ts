import axios from 'axios';

const pokemonApiBase = process.env.REACT_APP_POKEMON_API_BASE;

export const getPokemonImageURL = (pokedexNumber: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`;

export enum AxiosPokeApiRoutes {
  POKEDEX_GEN_1 = '/pokemon?limit=151',
}

export const axiosPokeApi = axios.create({
  baseURL: pokemonApiBase,
});
