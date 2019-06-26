import React, { useState, createContext, useContext } from 'react';
const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(false);

  const login = () =>
    setUser({
      name: 'Hebert Porto',
      email: 'hebertporto@gmail.com',
      token: 'Ads@XWasdW%@2a#2apo&',
    });
  const logout = () => setUser(false);
  const register = () => login();

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, setUser }}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
