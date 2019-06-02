export function authenticateUser(sessionToken, apiToken) {
  localStorage.setItem('sessionToken', sessionToken);
  localStorage.setItem('apiToken', apiToken);
}

export function isUserAuthenticated() {
  return localStorage.getItem('sessionToken') !== null;
}

export function getApiToken() {
  return localStorage.getItem('apiToken');
}

export function deauthenticateUser() {
  localStorage.removeItem('sessionToken');
  localStorage.removeItem('apiToken');
}

export function getSessionToken() {
  return localStorage.getItem('sessionToken');
}
