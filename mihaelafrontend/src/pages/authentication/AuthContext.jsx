import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const setStorage = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  } else {
    localStorage.removeItem('accessToken');

    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [name, setName] = useState(Cookies.get('name'));
    
  const login =(newToken, name) => {
    localStorage.setItem('token', newToken, { expires: 7 });
    localStorage.setItem('name', name)
    setToken(newToken);
    setName(name);
    console.log("Login token:", localStorage.getItem('token'));
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('name');
    setToken(null);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{token, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);