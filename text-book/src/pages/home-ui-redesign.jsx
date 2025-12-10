// Home Screen Component with Premium Instagram-Style Design
import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// Global Theme Configuration
const theme = {
  colors: {
    primaryGradient: 'linear-gradient(135deg, #E00070 0%, #FF7A00 100%)',
    secondary: '#0C0C0C',
    highlight: '#E9C46A',
    text: {
      light: '#FFFFFF',
      dark: '#333333',
      muted: '#CCCCCC'
    },
    backgrounds: {
      dark: '#000000',
      card: 'rgba(255, 255, 255, 0.05)',
      glass: 'rgba(255, 255, 255, 0.1)'
    }
  },
  typography: {
    english: {
      ui: "'Poppins', sans-serif",
      headings: "'Playfair Display', serif"
    },
    urdu: {
      ui: "'Noto Naskh Arabic', serif"
    }
  }
};

// Language Context Provider
const LanguageContext = React.createContext();

// Custom Hook for Theme Management
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('english'); // 'english' or 'urdu'

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'english' ? 'urdu' : 'english');

  return { isDarkMode, language, toggleTheme, toggleLanguage };
};

// Glass Card Component
const GlassCard = ({ children, className = '', style = {} }) => (
  <div
    className={`backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 ${
      className
    }`}
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      ...style
    }}
  >
    {children}
  </div>
);

// Button Component
const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  disabled = false
}) => {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-[#E00070] to-[#FF7A00] text-white shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-[#E00070] text-[#E00070] bg-transparent hover:bg-[#E00070]/10',
    outline: 'border-2 border-white text-white bg-transparent hover:bg-white/10'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: variant === 'primary' ? theme.colors.primaryGradient : undefined
      }}
    >
      {children}
    </button>
  );
};

// Input Component with Floating Labels
const Input = ({ label, type = 'text', value, onChange, placeholder, icon }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 bg-black/30 border-2 border-white/20 rounded-xl text-white placeholder-transparent focus:border-[#E00070] focus:outline-none transition-all duration-300 ${
          icon ? 'pl-12' : 'pl-4'
        }`}
      />
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value ? 'top-2 text-xs text-[#E00070]' : 'top-3.5 text-sm text-gray-400'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

// Home Screen Component
const HomeScreen = () => {
  const { language, toggleLanguage } = useTheme();
  const { siteConfig } = useDocusaurusContext();

  const content = {
    english: {
      title: "Read & Grow",
      subtitle: "Expand your knowledge with cutting-edge robotics education",
      ctaPrimary: "Start Reading",
      ctaSecondary: "GitHub",
      heroAlt: "Books and reading materials"
    },
    urdu: {
      title: "پڑھیں اور بڑھیں",
      subtitle: "روبوٹکس کی تعلیم کے ساتھ اپنے علم کو وسعت دیں",
      ctaPrimary: "پڑھنا شروع کریں",
      ctaSecondary: "گیتھب",
      ctaToggle: "اکاؤنٹ ہے؟ لاگ ان کریں",
      placeholderEmail: "ای میل درج کریں",
      placeholderPassword: "پاس ورڈ درج کریں",
      placeholderName: "نام درج کریں",
      heroAlt: "کتب اور مطالعہ کے مواد"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E00070] via-black to-[#FF7A00] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E00070]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <GlassCard className="max-w-2xl mx-auto text-center">
          {/* Hero Image/Illustration */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#E00070] to-[#FF7A00] rounded-full flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"
                style={{ fontFamily: theme.typography.english.headings }}>
              {currentContent.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed"
               style={{ fontFamily: theme.typography.english.ui }}>
              {currentContent.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary">
              {currentContent.ctaPrimary}
            </Button>
            <Button variant="outline">
              {currentContent.ctaSecondary}
            </Button>
          </div>
        </GlassCard>

        {/* Footer with Language Toggle */}
        <div className="fixed bottom-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            {language === 'english' ? 'اردو' : 'English'}
          </button>

          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login/Signup Screen Component
const AuthScreen = ({ isLogin = true }) => {
  const { language, toggleLanguage } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: isLogin ? '' : ''
  });

  const content = {
    english: {
      loginTitle: "Welcome Back",
      signupTitle: "Join Our Community",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      nameLabel: "Full Name",
      loginBtn: "Sign In",
      signupBtn: "Create Account",
      toggleText: "Don't have an account? Sign up",
      forgotPassword: "Forgot Password?",
      socialLogin: "Continue with Google"
    },
    urdu: {
      loginTitle: "واپس مبارک ہو",
      signupTitle: "ہماری برادری میں شامل ہوں",
      emailLabel: "ای میل ایڈریس",
      passwordLabel: "پاس ورڈ",
      nameLabel: "مکمل نام",
      loginBtn: "سائن ان کریں",
      signupBtn: "اکاؤنٹ بنائیں",
      toggleText: "اکاؤنٹ نہیں ہے؟ سائن اپ کریں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      socialLogin: "گوگل کے ساتھ جاری رکھیں"
    }
  };

  const currentContent = content[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E00070] via-black to-[#FF7A00] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#E00070]/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-[#FF7A00]/20 rounded-full blur-2xl"></div>
      </div>

      <GlassCard className="w-full max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: theme.typography.english.headings }}>
            {isLogin ? currentContent.loginTitle : currentContent.signupTitle}
          </h2>
          <p className="text-gray-400" style={{ fontFamily: theme.typography.english.ui }}>
            {isLogin ? currentContent.loginSub : currentContent.signupSub}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <Input
              label={currentContent.nameLabel}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={currentContent.nameLabel}
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              }
            />
          )}

          <Input
            label={currentContent.emailLabel}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={currentContent.emailLabel}
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            }
          />

          <Input
            label={currentContent.passwordLabel}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={currentContent.passwordLabel}
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
            }
          />

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-[#E00070] hover:text-[#FF7A00] text-sm transition-colors duration-300">
                {currentContent.forgotPassword}
              </button>
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full">
            {isLogin ? currentContent.loginBtn : currentContent.signupBtn}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              onClick={() => window.location.hash = isLogin ? '#signup' : '#login'}
            >
              {isLogin ? currentContent.toggleText : currentContent.toggleText.replace('Sign up', 'Log in')}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <button
              type="button"
              className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.83-2.22.83-.65z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {currentContent.socialLogin}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        {language === 'english' ? 'اردو' : 'English'}
      </button>
    </div>
  );
};

// Main App Component
const App = () => {
  const location = useLocation();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    const hash = location.hash;
    if (hash === '#signup') {
      setAuthMode('signup');
    } else if (hash === '#login') {
      setAuthMode('login');
    }
  }, [location]);

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return (
      <LanguageContext.Provider value={useTheme()}>
        <AuthScreen isLogin={authMode === 'login'} />
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={useTheme()}>
      <HomeScreen />
    </LanguageContext.Provider>
  );
};

export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook - Premium Reading Experience">
      <App />
    </Layout>
  );
}