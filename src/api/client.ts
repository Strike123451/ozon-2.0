import axios from 'axios';
// Бесплатный Fake API из интернета: https://dummyjson.com
export const api = axios.create({ baseURL: 'https://dummyjson.com', timeout: 10000 });
