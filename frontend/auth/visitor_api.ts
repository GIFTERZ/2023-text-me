import axios from 'axios';

const visitor_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default visitor_api;
