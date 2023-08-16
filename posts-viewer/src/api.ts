import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.vk.com/method/',
});

export default api;
