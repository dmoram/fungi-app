import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.8.101:8000/api',
});

export default instance;

