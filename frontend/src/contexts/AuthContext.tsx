// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  login(credentials: object): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca o token e o usuário salvos no navegador ao iniciar o app
    const storagedToken = localStorage.getItem('@todo:token');
    const storagedUser = localStorage.getItem('@todo:user');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  async function login(credentials: object) {
    const response = await api.post('/auth/login', credentials);
    
    const { token, user: loggedUser } = response.data;

    setUser(loggedUser);

    // Guarda as informações fisicamente no navegador
    localStorage.setItem('@todo:token', token);
    localStorage.setItem('@todo:user', JSON.stringify(loggedUser));
  }

  function logout() {
    localStorage.removeItem('@todo:token');
    localStorage.removeItem('@todo:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto nas páginas
export function useAuth() {
  return useContext(AuthContext);
}