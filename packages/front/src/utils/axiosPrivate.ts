import axios from 'axios';

const apiBase = process.env.REACT_APP_API_BASE;

export enum AxiosPrivateRoutes {
  LOGIN = '/auth/local',
  POKEMONS = '/pokemons',
}

export const axiosPrivate = axios.create({
  baseURL: apiBase,
});
