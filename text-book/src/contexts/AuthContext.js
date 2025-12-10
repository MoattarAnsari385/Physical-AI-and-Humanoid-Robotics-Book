import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get user from localStorage
        const storedUser = localStorage.getItem('docusaurus-auth-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signup = async (email, password, additionalData = {}) => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('docusaurus-users') || '[]');
    const userExists = existingUsers.some(u => u.email === email);

    if (userExists) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In a real app, this should be hashed
      ...additionalData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store user in localStorage
    localStorage.setItem('docusaurus-auth-user', JSON.stringify(newUser));

    // Add to users list
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('docusaurus-users', JSON.stringify(updatedUsers));

    setUser(newUser);
    return newUser;
  };

  const signin = async (email, password) => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('docusaurus-users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Remove password from user object for security
    const { password: _, ...userWithoutPassword } = foundUser;

    localStorage.setItem('docusaurus-auth-user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const signout = async () => {
    localStorage.removeItem('docusaurus-auth-user');
    setUser(null);
  };

  const updateUser = async (updatedData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    // Update in localStorage
    localStorage.setItem('docusaurus-auth-user', JSON.stringify(updatedUser));

    // Update in users list
    const allUsers = JSON.parse(localStorage.getItem('docusaurus-users') || '[]');
    const updatedUsers = allUsers.map(u =>
      u.id === user.id ? { ...u, ...updatedData } : u
    );
    localStorage.setItem('docusaurus-users', JSON.stringify(updatedUsers));

    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    loading,
    signup,
    signin,
    signout,
    updateUser,
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