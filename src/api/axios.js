import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ffa6-146-83-216-251.ngrok-free.app/api',
});

export default instance;

