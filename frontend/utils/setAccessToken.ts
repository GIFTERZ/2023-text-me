import { setCookie } from "../auth/Cookie";
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

export { setAccessToken, setExpiryTime };
