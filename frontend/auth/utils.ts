const setRefreshToken = (token: string) => {
  localStorage.setItem("textMeRefreshToken", token);
};

const getRefreshToken = () => {
  return localStorage.getItem("textMeRefreshToken");
};

const deleteRefreshToken = () => {
  localStorage.removeItem("textMeRefreshToken");
};

export { setRefreshToken, getRefreshToken, deleteRefreshToken };
