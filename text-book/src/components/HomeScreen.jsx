import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './App';

const HomeScreen = () => {
  const { theme, language, toggleLanguage, isLoggedIn, user } = useContext(ThemeContext);
  const navigate = useNavigate();

  const content = {
    english: {
      title: "Read & Grow",
      subtitle: "Expand your knowledge with cutting-edge robotics education",
      ctaPrimary: "Start Reading",
      ctaSecondary: "GitHub",
      heroAlt: "Books and reading materials",
      modulesTitle: "Learning Modules",
      module1: "Module 1: Robotic Nervous System (ROS 2)",
      module2: "Module 2: The Digital Twin (Gazebo & Simulation)",
      module3: "Module 3: The AI-Robot Brain (NVIDIA Isaac)",
      module4: "Module 4: Vision-Language-Action (VLA)",
      statsTitle: "Course Statistics",
      modulesCount: "4 Modules",
      chaptersCount: "24+ Chapters",
      completionRate: "100% Complete"
    },
    urdu: {
      title: "پڑھیں اور بڑھیں",
      subtitle: "روبوٹکس کی تعلیم کے ساتھ اپنے علم کو وسعت دیں",
      ctaPrimary: "پڑھنا شروع کریں",
      ctaSecondary: "گیتھب",
      heroAlt: "کتب اور مطالعہ کے مواد",
      modulesTitle: "سیکھنے کے ماڈیولز",
      module1: "ماڈیول 1: روبوٹک نروس سسٹم (ROS 2)",
      module2: "ماڈیول 2: ڈیجیٹل ٹوئن (گیزبو اور سیمولیشن)",
      module3: "ماڈیول 3: AI روبوٹ براہن (NVIDIA آئیساک)",
      module4: "ماڈیول 4: وژن لینگویج ایکشن (VLA)",
      statsTitle: "کورس کے اعداد و شمار",
      modulesCount: "4 ماڈیولز",
      chaptersCount: "24+ ابواب",
      completionRate: "100% مکمل"
    }
  };

  const currentContent = content[language];

  const modules = [
    {
      id: 1,
      title: currentContent.module1,
      description: language === 'english'
        ? "Learn the fundamentals of ROS 2 communication and robotic systems"
        : "ROS 2 کے مواصلات اور روبوٹک سسٹمز کے فنڈامینلز سیکھیں",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: currentContent.module2,
      description: language === 'english'
        ? "Explore simulation environments and digital twin concepts"
        : "سیمولیشن ماحول اور ڈیجیٹل ٹوئن کے تصورات کو جانیں",
      color: "from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: currentContent.module3,
      description: language === 'english'
        ? "Master perception and navigation with NVIDIA Isaac"
        : "NVIDIA آئیساک کے ساتھ تاثر اور نیویگیشن کا ماسٹر بنیں",
      color: "from-orange-600 to-red-600"
    },
    {
      id: 4,
      title: currentContent.module4,
      description: language === 'english'
        ? "Integrate vision, language, and action for humanoid robots"
        : "ہیومنوڈ روبوٹس کے لیے وژن، لینگویج، اور ایکشن کو مربوط کریں",
      color: "from-indigo-600 to-pink-600"
    }
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: theme.primaryGradient,
        fontFamily: language === 'english' ? 'Poppins, sans-serif' : 'Noto Naskh Arabic, serif'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E00070]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#E00070] to-[#FF7A00] rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{
                fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif'
              }}
            >
              {currentContent.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              {currentContent.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              className="px-12 py-4 bg-white text-black rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E00070] hover:to-[#FF7A00] hover:text-white"
              onClick={() => navigate('/library')}
            >
              {currentContent.ctaPrimary}
            </button>

            <button
              className="px-12 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('https://github.com/facebook/docusaurus', '_blank')}
            >
              {currentContent.ctaSecondary}
            </button>
          </div>

          {/* Learning Modules Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: language === 'english' ? "'Playfair Display', serif" : 'Noto Naskh Arabic, serif' }}>
              {currentContent.modulesTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/docs/module-${module.id}-${module.id === 1 ? 'ros2' : module.id === 2 ? 'simulation' : module.id === 3 ? 'ai' : 'vla'}/intro`)}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{module.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
                  <p className="text-white/70 text-sm">{module.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-white/80">{currentContent.modulesCount}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24+</div>
              <div className="text-white/80">{currentContent.chaptersCount}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80">{currentContent.completionRate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar with Toggles */}
      <div className="fixed bottom-6 left-6 right-6 flex justify-between items-center max-w-4xl mx-auto">
        <button
          onClick={toggleLanguage}
          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm font-medium"
        >
          {language === 'english' ? 'اردو' : 'English'}
        </button>

        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
        </div>

        <button
          onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm font-medium"
        >
          {isLoggedIn ? (language === 'english' ? 'Profile' : 'پروفائل') : (language === 'english' ? 'Login' : 'لاگ ان')}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;