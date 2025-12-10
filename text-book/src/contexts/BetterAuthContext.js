import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut, signUp } from '../lib/auth-client';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get session from Better-Auth
  const { data: session, isLoading: isSessionLoading } = useSession();

  // Update user state when session changes
  useEffect(() => {
    if (!isSessionLoading) {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          ...session.user.additionalData, // Include extended user fields
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [session, isSessionLoading]);

  const signup = async (email, password, additionalData = {}) => {
    try {
      const result = await signUp.email({
        email,
        password,
        ...additionalData
      });
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const result = await signIn.email({
        email,
        password,
        // This will redirect or handle the response as needed
      });
      return result;
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const value = {
    user,
    loading,
    signup,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};