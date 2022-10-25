import axios from 'axios';
import {BASE_URL} from '../config/env.json';

const client = axios.create({
  baseURL: BASE_URL,
});

export {client};
