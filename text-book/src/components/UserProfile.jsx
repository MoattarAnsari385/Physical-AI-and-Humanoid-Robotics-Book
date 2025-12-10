import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './App';

const UserProfile = () => {
  const { theme, language, toggleLanguage, user, logout } = useContext(ThemeContext);
  const navigate = useNavigate();

  const content = {
    english: {
      profile: "Profile",
      settings: "Settings",
      stats: "Statistics",
      booksRead: "Books Read",
      chaptersCompleted: "Chapters Completed",
      timeSpent: "Time Spent Learning",
      achievements: "Achievements",
      logout: "Logout",
      editProfile: "Edit Profile",
      darkMode: "Dark Mode",
      language: "Language",
      readingStats: "Reading Statistics",
      completedModules: "Completed Modules",
      currentProgress: "Current Progress"
    },
    urdu: {
      profile: "پروفائل",
      settings: "ترتیبات",
      stats: "اعداد و شمار",
      booksRead: "کتب پڑھی گئیں",
      chaptersCompleted: "چیپٹرز مکمل ہوئے",
      timeSpent: "سیکھنے میں لگا وقت",
      achievements: "کامیابیاں",
      logout: "لاگ آوٹ",
      editProfile: "پروفائل میں ترمیم",
      darkMode: "ڈارک موڈ",
      language: "زبان",
      readingStats: "پڑھنے کے اعداد و شمار",
      completedModules: "مکمل ماڈیولز",
      currentProgress: "موجودہ پیشرفت"
    }
  };

  const currentContent = content[language];

  // Mock user data
  const mockUserData = {
    name: "Student",
    email: "student@example.com",
    joinDate: "2024-01-15",
    stats: {
      booksRead: 1,
      chaptersCompleted: 18,
      timeSpent: "42 hours",
      completedModules: 2
    },
    achievements: [
      { id: 1, title: language === 'english' ? "ROS 2 Fundamentals Master" : "ROS 2 کے فنڈامینلز ماسٹر", earned: true },
      { id: 2, title: language === 'english' ? "Simulation Explorer" : "سیمولیشن ایکسپلورر", earned: true },
      { id: 3, title: language === 'english' ? "AI Perception Pioneer" : "AI تاثر کا راستہ دکھانے والا", earned: false }
    ]
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: theme.primaryGradient,
        fontFamily: language === 'english' ? 'Poppins, sans-serif' : 'Noto Naskh Arabic, serif'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif' }}
          >
            {currentContent.profile}
          </h1>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm"
          >
            ← {language === 'english' ? 'Back to Home' : 'واپس گھر'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#E00070] to-[#FF7A00] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{mockUserData.name}</h2>
                <p className="text-white/70">{mockUserData.email}</p>
                <p className="text-white/50 text-sm mt-2">
                  {language === 'english' ? 'Member since' : 'رکنیت تاریخ'} {new Date(mockUserData.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                  </svg>
                  {currentContent.settings}
                </button>

                <button
                  onClick={logout}
                  className="w-full py-3 px-4 bg-red-600/20 backdrop-blur-sm rounded-xl text-red-300 border border-red-500/30 hover:bg-red-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  {currentContent.logout}
                </button>
              </div>
            </div>
          </div>

          {/* Stats and Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif' }}>
                {currentContent.stats}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{mockUserData.stats.booksRead}</div>
                  <div className="text-white/70 text-sm">{currentContent.booksRead}</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{mockUserData.stats.chaptersCompleted}</div>
                  <div className="text-white/70 text-sm">{currentContent.chaptersCompleted}</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{mockUserData.stats.timeSpent}</div>
                  <div className="text-white/70 text-sm">{currentContent.timeSpent}</div>
                </div>
                <div className="bg-black/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{mockUserData.stats.completedModules}</div>
                  <div className="text-white/70 text-sm">{currentContent.completedModules}</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif' }}>
                {currentContent.achievements}
              </h3>

              <div className="space-y-3">
                {mockUserData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center p-4 rounded-xl border transition-all duration-300 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-[#E00070]/20 to-[#FF7A00]/20 border-[#E00070]/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      achievement.earned ? 'bg-gradient-to-r from-[#E00070] to-[#FF7A00]' : 'bg-white/10'
                    }`}>
                      {achievement.earned ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-white' : 'text-white/50'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {achievement.earned
                          ? language === 'english' ? 'Earned' : 'کمائی گئی'
                          : language === 'english' ? 'Locked' : ' مقفل'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif' }}>
                {currentContent.currentProgress}
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span>{language === 'english' ? 'Module 1: ROS 2' : 'ماڈیول 1: ROS 2'}</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#E00070] to-[#FF7A00] h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span>{language === 'english' ? 'Module 2: Simulation' : 'ماڈیول 2: سیمولیشن'}</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#E00070] to-[#FF7A00] h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span>{language === 'english' ? 'Module 3: AI Perception' : 'ماڈیول 3: AI تاثر'}</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#E00070] to-[#FF7A00] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span>{language === 'english' ? 'Module 4: VLA' : 'ماڈیول 4: VLA'}</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#E00070] to-[#FF7A00] h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;