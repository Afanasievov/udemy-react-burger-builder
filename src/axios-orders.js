import axios from 'axios';

import { AUTH } from './config/api';

const instance = axios.create({
  baseURL: AUTH.BASE_URL,
});

export default instance;
