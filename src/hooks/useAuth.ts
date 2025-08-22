import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number; // timestamp em segundos
  id: number;
  cargo: string;
}

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");

  let isValid = true;
  let parsed = usuario ? JSON.parse(usuario) : null;

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);

      // se já expirou → invalida
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        isValid = false;
        parsed = null;
      }
    } catch (err) {
      console.error("Token inválido:", err);
      isValid = false;
      parsed = null;
    }
  } else {
    isValid = false;
  }

  return {
    token: isValid ? token : null,
    usuario: parsed
      ? { ...parsed, cargo: parsed.cargo.toUpperCase() }
      : null,
  };
};