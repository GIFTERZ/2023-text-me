import { deleteCookie, getCookie, setCookie } from "./Cookie";
import { ACCESS_EXPIRY_TIME, STORAGE_NAME } from "../constants/token";

const setAccessToken = (token: string) => {
  setCookie(STORAGE_NAME.ACCESS_TOKEN, token);
};

const setExpiryTime = (createdTime: number) => {
  localStorage.setItem(
    STORAGE_NAME.EXPIRY_TIME,
    (createdTime + ACCESS_EXPIRY_TIME).toString()
  );
};

const getAccessToken = () => {
  return getCookie(STORAGE_NAME.ACCESS_TOKEN);
};

const getExpiryTime = () => {
  return localStorage.getItem(STORAGE_NAME.EXPIRY_TIME);
};

const deleteAccessToken = () => {
  deleteCookie(STORAGE_NAME.ACCESS_TOKEN);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem("textMeRefreshToken", token);
};

const getRefreshToken = () => {
  return localStorage.getItem("textMeRefreshToken");
};

const deleteRefreshToken = () => {
  localStorage.removeItem("textMeRefreshToken");
};

export {
  setAccessToken,
  setExpiryTime,
  getAccessToken,
  getExpiryTime,
  deleteAccessToken,
  setRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
};
