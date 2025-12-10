import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react'; // Add useContext import
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import BookReader from './BookReader';
import UserProfile from './UserProfile';
import LibraryScreen from './LibraryScreen';
import OnboardingFlow from './OnboardingFlow';

// Theme Context
export const ThemeContext = createContext();

// Main App Component
const App = () => {
  const [theme, setTheme] = useState({
    primaryGradient: 'linear-gradient(135deg, #E00070 0%, #FF7A00 100%)',
    backgroundColor: '#0C0C0C',
    textColor: '#FFFFFF',
    cardBackground: 'rgba(255, 255, 255, 0.05)',
    isDarkMode: true
  });

  const [language, setLanguage] = useState('english'); // 'english' or 'urdu'
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Set default language based on user preference or system
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Default to english
      setLanguage('english');
    }

    setIsLoading(false);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'english' ? 'urdu' : 'english';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const themeValue = {
    theme,
    language,
    user,
    toggleLanguage,
    login,
    logout
  };

  if (isLoading) {
    return (
      <div style={{ background: theme.primaryGradient, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(ThemeContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// App Routes Component
const AppRoutes = () => {
  const { user } = useContext(ThemeContext);
  const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');

  // If user is not logged in and hasn't completed onboarding, redirect to onboarding
  if (!user && !hasCompletedOnboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/login" element={<AuthScreen isLogin={true} />} />
        <Route path="/signup" element={<AuthScreen isLogin={false} />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<AuthScreen isLogin={true} />} />
      <Route path="/signup" element={<AuthScreen isLogin={false} />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />

      {/* Protected Routes */}
      <Route
        path="/reader/:moduleId/:chapterId"
        element={
          <ProtectedRoute>
            <BookReader />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <LibraryScreen />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;