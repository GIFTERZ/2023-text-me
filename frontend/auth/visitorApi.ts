import axios from 'axios';

const visitorApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default visitorApi;
