import { TOKEN } from "../utils/constans";

// setToken => guarda la function en un localStorage (el espacio reservado se usa varias veces)
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}
