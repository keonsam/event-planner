const tokenKey = "jwt_token";

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function saveToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export function deleteToken() {
  localStorage.removeItem(tokenKey)
}
