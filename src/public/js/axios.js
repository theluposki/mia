import { config } from './config.js'

export const Axios = axios.create({
  baseURL: config.baseURL
});

// Alter defaults after Axios has been created
Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
