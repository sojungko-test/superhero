export function authenticateUser(token) {
  localStorage.setItem('token', token);
}

export function isUserAuthenticated() {
  return !!localStorage.getItem('token');
}

export function deauthenticateUser() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}
