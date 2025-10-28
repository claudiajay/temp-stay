import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";


interface User {
  username?: string; 
  email?: string;      
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
   user: User | null;
   login: (token: string, user?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
   const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load token from localStorage on page load
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
    }
     if (storedUser) {
      setUser(JSON.parse(storedUser));
     }
  }, []);

  const login = (newToken: string, newUser?: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (newUser) { 
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
     setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
