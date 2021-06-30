import axios from 'axios';
import { getToken, isAuthenticated } from './auth'

// const baseURL = 'http://192.168.1.101:3000/pt';
const baseURL = 'https://appapi.rkmengenharia.com.br/pt';

const api = axios.create({ baseURL });

api.interceptors.request.use(async (options) => {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    options.headers['x-access-token'] = await getToken()
  }
  return options;
})

api.interceptors.response.use(response => {
  return response.data;
})

api.baseUrl = baseURL;

export default api;