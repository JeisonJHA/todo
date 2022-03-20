import jwt from 'jwt-decode';
export const TOKEN_KEY = "@todo-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const userName = () => {
  const token = getToken();
  if (!token) return '';
  const decoded = jwt(token);
  return decoded.userName;
}
