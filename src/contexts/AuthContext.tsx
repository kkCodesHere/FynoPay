import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  paymentPin: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, pin: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (username: string, pin: string) => {
    // In a real app, you would call your backend API here
    console.log('Logging in with:', username, pin);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const signup = async (data: SignupData) => {
    // In a real app, you would call your backend API here
    console.log('Signing up with:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);