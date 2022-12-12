import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (name: string, value: string, option?: Object) => {
  return cookies.set(name, value, option);
};

const getCookie = (name: string) => {
  return cookies.get(name);
};

const deleteCookie = (name: string) => {
  return cookies.remove(name);
};

export { setCookie, getCookie, deleteCookie };
