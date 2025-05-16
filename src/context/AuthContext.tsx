import React, { createContext, useContext, useState, ReactNode } from 'react';
import { apiPost } from '../services/api';

interface User { id: number; email: string; firstName: string; lastName: string; }
interface RegisterInput { firstName: string; lastName: string; email: string; password: string; }
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as any);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedRaw = localStorage.getItem('user');
  const stored = storedRaw && storedRaw !== 'undefined' ? storedRaw : null;
  const [user, setUser] = useState<User | null>(stored ? JSON.parse(stored) : null);

  const login = async (email: string, password: string) => {
    const { access_token, user: newUser } = await apiPost('/api/auth/login', { email, password });
    localStorage.setItem('token', access_token);
    setUser(newUser as User);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const register = async (input: RegisterInput) => {
    const { access_token, user: newUser } = await apiPost('/api/auth/register', input);
    localStorage.setItem('token', access_token);
    setUser(newUser as User);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
