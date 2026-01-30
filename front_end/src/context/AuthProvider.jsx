import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Debug : affichez les données utilisateur
  useEffect(() => {
    console.log('AuthProvider - Current user:', user);
  }, [user]);

  const login = (userData) => {
    console.log('AuthProvider - Login with data:', userData); // Debug
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('AuthProvider - Logout'); // Debug
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
