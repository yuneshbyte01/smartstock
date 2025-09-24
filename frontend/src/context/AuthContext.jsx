import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
  });

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('role', userData.role);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
