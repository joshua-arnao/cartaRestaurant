import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  useEffect(() => {
    (async () => {
      const token = getToken();
      console.log(token);
      if (token) {
        const me = await getMe(token);
        setAuth({ token, me });
        console.log(me);
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = async (token) => {
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
    console.log(me);
  };

  const logout = (token) => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };
  const ValueContext = {
    auth,
    login,
    logout,
  };

  // con esta función al recargar la página no veremos la vista login en nigún moemnto
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={ValueContext}>{children}</AuthContext.Provider>
  );
}
