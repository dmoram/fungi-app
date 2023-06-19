import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://spicy-trams-happen.loca.lt',
});

export default instance;

