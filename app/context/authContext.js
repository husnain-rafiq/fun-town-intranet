import React, { useState, useContext, createContext, useEffect } from 'react';
import { LOCAL_STORAGE_ENTRIES } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ENTRIES.user)
  ) || {
    isAuthenticated: false,
    token: null,
    data: {},
    announcement: [],
  };

  const [user, setUser] = useState(initData);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
