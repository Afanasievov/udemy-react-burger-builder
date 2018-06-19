import axios from 'axios';

import { BURGER_BUILDER } from './config/api';

const instance = axios.create({
  baseURL: BURGER_BUILDER.BASE_URL,
});

export default instance;
