import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './App';

const AuthScreen = ({ isLogin = true }) => {
  const { theme, language, toggleLanguage, login } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const content = {
    english: {
      loginTitle: "Welcome Back",
      signupTitle: "Join Our Community",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      nameLabel: "Full Name",
      confirmPasswordLabel: "Confirm Password",
      loginBtn: "Sign In",
      signupBtn: "Create Account",
      toggleText: isLogin
        ? "Don't have an account? Sign up"
        : "Already have an account? Login",
      forgotPassword: "Forgot Password?",
      socialLogin: "Continue with Google",
      or: "OR"
    },
    urdu: {
      loginTitle: "واپس مبارک ہو",
      signupTitle: "ہماری برادری میں شامل ہوں",
      emailLabel: "ای میل ایڈریس",
      passwordLabel: "پاس ورڈ",
      nameLabel: "مکمل نام",
      confirmPasswordLabel: "پاس ورڈ کی تصدیق کریں",
      loginBtn: "سائن ان کریں",
      signupBtn: "اکاؤنٹ بنائیں",
      toggleText: isLogin
        ? "اکاؤنٹ نہیں ہے؟ سائن اپ کریں"
        : "پہلے سے اکاؤنٹ ہے؟ لاگ ان کریں",
      forgotPassword: "پاس ورڈ بھول گئے؟",
      socialLogin: "گوگل کے ساتھ جاری رکھیں",
      or: "یا"
    }
  };

  const currentContent = content[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert(language === 'english' ? 'Passwords do not match' : 'پاس ورڈز مماثل نہیں ہیں');
      return;
    }

    try {
      // Simulate authentication
      const userData = {
        id: 1,
        name: isLogin ? 'User' : formData.name,
        email: formData.email,
        joinDate: new Date().toISOString()
      };

      login(userData);

      // Redirect to previous location or home
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (error) {
      console.error('Authentication error:', error);
      alert(language === 'english' ? 'Authentication failed' : 'توثیق ناکام ہوگئی');
    }
  };

  const toggleAuthMode = () => {
    navigate(isLogin ? '/signup' : '/login');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: theme.primaryGradient }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#E00070] to-[#FF7A00] rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>

            <h2
              className="text-3xl font-bold text-white mb-2"
              style={{
                fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif'
              }}
            >
              {isLogin ? currentContent.loginTitle : currentContent.signupTitle}
            </h2>
            <p className="text-white/70">
              {isLogin
                ? language === 'english' ? 'Continue your learning journey' : 'اپنی سیکھنے کی رفتار جاری رکھیں'
                : language === 'english' ? 'Start your robotics adventure' : 'اپنی روبوٹکس کی مہم جوئی شروع کریں'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {currentContent.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E00070] transition-colors duration-300"
                  placeholder={currentContent.nameLabel}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                {currentContent.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E00070] transition-colors duration-300"
                placeholder={currentContent.emailLabel}
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                {currentContent.passwordLabel}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E00070] transition-colors duration-300"
                placeholder={currentContent.passwordLabel}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {currentContent.confirmPasswordLabel}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E00070] transition-colors duration-300"
                  placeholder={currentContent.confirmPasswordLabel}
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-[#E00070] hover:text-[#FF7A00] text-sm transition-colors duration-300">
                  {currentContent.forgotPassword}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#E00070] to-[#FF7A00] text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? currentContent.loginBtn : currentContent.signupBtn}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="px-4 text-white/60 text-sm">{currentContent.or}</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          <button className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            {currentContent.socialLogin}
          </button>

          <div className="text-center mt-6">
            <button
              onClick={toggleAuthMode}
              className="text-[#E00070] hover:text-[#FF7A00] text-sm transition-colors duration-300"
            >
              {currentContent.toggleText}
            </button>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="text-center mt-6">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm"
          >
            {language === 'english' ? 'اردو' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;