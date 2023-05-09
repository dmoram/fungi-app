import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.20.80.93:8000/api',
});

export default instance;

