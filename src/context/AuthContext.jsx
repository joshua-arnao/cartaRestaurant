import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;

  const ValueContext = {
    auth: null,
    login: () => console.log("Realizando Login"),
    logout: () => console.log("Cerrando sesión"),
  };

  return (
    <AuthContext.Provider value={ValueContext}>{children}</AuthContext.Provider>
  );
}
