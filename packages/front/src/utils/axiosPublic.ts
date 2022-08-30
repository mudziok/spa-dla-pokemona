import axios from 'axios';

const apiBase = process.env.REACT_APP_API_BASE;

export enum AxiosPublicRoutes {
  LOGIN = '/auth/local',
}

export const axiosPublic = axios.create({
  baseURL: apiBase,
});
