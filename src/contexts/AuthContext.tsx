
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('graveyard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
      };
      
      setUser(newUser);
      localStorage.setItem('graveyard_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Failed to create account');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
      };
      
      setUser(existingUser);
      localStorage.setItem('graveyard_user', JSON.stringify(existingUser));
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('graveyard_user');
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
