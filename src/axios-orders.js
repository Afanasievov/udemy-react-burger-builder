import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-f06ca.firebaseio.com/',
});

export default instance;
