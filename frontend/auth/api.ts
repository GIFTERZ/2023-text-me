import axios from "axios";
import { refreshTokenRotation } from "./refreshTokenRotation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const { setAuthHeader } = refreshTokenRotation();

api.interceptors.request.use(setAuthHeader);

export default api;
