export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  return token;
};

export const setTokenExpiry = () => {
  const oneDay = 24 * 60 * 60 * 1000; // 1d
  const now = Date.now();
  const oneDayFromNow = now + oneDay;

  return oneDayFromNow.toString();
};

export const isTokenExpired = () => {
  const expiryDate = localStorage.getItem("expiryDate");

  return expiryDate ? Date.now() > parseInt(expiryDate) : true;
};
