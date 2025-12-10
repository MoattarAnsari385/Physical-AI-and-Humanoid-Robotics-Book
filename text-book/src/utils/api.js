// src/utils/api.js
// API utility functions for user preferences and profile

export const getUserPreferences = async (userId) => {
  try {
    // In a real implementation, this would call your backend API
    // For now, we'll simulate with localStorage as fallback
    const stored = localStorage.getItem(`user-preferences-${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }

    // Default preferences
    return {
      level_preference: 'intermediate',
      language: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return {
      level_preference: 'intermediate',
      language: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};

export const updateUserPreferences = async (userId, preferences) => {
  try {
    // In a real implementation, this would call your backend API
    // For now, we'll store in localStorage
    const existing = await getUserPreferences(userId);
    const updatedPreferences = {
      ...existing,
      ...preferences,
      updated_at: new Date().toISOString()
    };

    localStorage.setItem(`user-preferences-${userId}`, JSON.stringify(updatedPreferences));
    return updatedPreferences;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

// Function to get translated content
export const getTranslatedContent = (content, language = 'en') => {
  if (!content) return '';

  // Sample Urdu translations - in a real app, these would come from a translation service or database
  const urduTranslations = {
    // Common educational content translations
    'Welcome to the comprehensive Physical AI & Humanoid Robotics textbook': 'جامع فزکل ای ۔آئی اور ہیومنوائڈ روبوٹکس کے م textbook میں خوش آمدید',
    'Course Overview': 'کورس کا جائزہ',
    'This textbook is structured into four progressive modules': 'یہ ٹیکسٹ بک چار ترقی پذیر ماڈیولز میں مرتب کی گئی ہے',
    'Learning Outcomes': 'سیکھنے کے نتائج',
    'After completing this textbook': 'اس ٹیکسٹ بک کو مکمل کرنے کے بعد',
    'Prerequisites': 'ضروریات',
    'Basic programming knowledge': 'بنیادی پروگرامنگ کا علم',
    'Getting Started': 'شروع کریں',
    'Begin with Module 1': 'ماڈیول 1 کے ساتھ شروع کریں',
    'Module 1: Robotic Nervous System (ROS 2)': 'ماڈیول 1: روبوٹک نروس سسٹم (ROS 2)',
    'Module 2: The Digital Twin (Gazebo & Simulation)': 'ماڈیول 2: ڈیجیٹل ٹوئن (گزیبو اور سیمولیشن)',
    'Module 3: The AI-Robot Brain (NVIDIA Isaac)': 'ماڈیول 3: ای ۔آئی روبوٹ بین (این وی ڈی ای اسیک)',
    'Module 4: Vision-Language-Action (VLA)': 'ماڈیول 4: وژن لینگویج ایکشن (وی ایل اے)',
    'Personalize Your Learning Experience': 'اپنے سیکھنے کے تجربے کو مخصوص کریں',
    'Customize Your Learning Experience': 'اپنے سیکھنے کے تجربے کو حسب ضرورت بنائیں',
    'Sign In': 'سائن ان کریں',
    'Sign Up': 'سائن اپ کریں',
    'Create Account': 'اکاؤنٹ بنائیں',
    'Email': 'ای میل',
    'Password': 'پاس ورڈ',
    'Software Experience Level': 'سافٹ ویئر کا تجربہ',
    'GPU Access': 'GPU تک رسائی',
    'Jetson Device': 'جیٹسن ڈیوائس',
    'Language': 'زبان',
    'Personalize:': 'مخصوص کریں:',
    'Beginner': 'ابتدائی',
    'Intermediate': 'درمیانہ',
    'Advanced': 'اعلی',
    'English': 'انگریزی',
    'Urdu': 'اردو',
    'Home': 'ہوم',
    'Library': 'لائبریری',
    'Physical AI & Humanoid Robotics Textbook': 'فزکل ای ۔آئی اور ہیومنوائڈ روبوٹکس کا ٹیکسٹ بک',
    'Physical AI & Humanoid Robotics': 'فزکل ای ۔آئی اور ہیومنوائڈ روبوٹکس',
    'This educational resource': 'یہ تعلیمی وسیلہ',
    'covers the modern robotics': 'جدید روبوٹکس کو احاطہ کرتا ہے',
    'from fundamental concepts': 'بنیادی تصورات سے',
    'to advanced cognitive robotics': 'اعلی درجے کی کوگنیٹو روبوٹکس تک',
    'introduction': 'تعارف',
    'Introduction': 'تعارف',
    'Overview': 'جائزہ',
    'Outcomes': 'نتائج',
    'Prerequisites': 'ضروریات',
    'Getting Started': 'شروع کریں',
    'Begin with': 'کے ساتھ شروع کریں',
    'to establish': 'قائم کرنے کے لیے',
    'foundational knowledge': 'بنیادی علم',
    'required for': 'کے لیے ضروری',
    'the subsequent modules': 'اگلے ماڈیولز',
    'Each module': 'ہر ماڈیول',
    'is designed': 'کا منصوبہ',
    'to be completed': 'مکمل کیا جانا',
    'in 2-3 weeks': '2-3 ہفتوں میں',
    'with the entire course': 'پورے کورس کے ساتھ',
    'taking approximately': 'تقریباً لے رہا',
    '13 weeks': '13 ہفتے',
    'The content includes': 'اس میں مواد شامل ہے',
    'hands-on examples': 'ہاتھوں میں مثالیں',
    'practical exercises': 'عملی مشقیں',
    'and assessments': 'اور جائزے',
    'to reinforce learning': 'سیکھنے کو مستحکم کرنے کے لیے',
    'All examples are': 'تمام مثالیں ہیں',
    'tested and reproducible': 'ٹیسٹ کی گئیں اور دوبارہ تخلیق کی جاسکتی ہیں',
    'in the provided': 'فراہم کردہ میں',
    'development environment': 'ترقی کا ماحول',
    'Design and implement': 'تیار کریں اور نفاذ کریں',
    'Create and simulate': 'تخلیق کریں اور محاکہ کریں',
    'Implement perception and navigation': 'ادراک اور نیویگیشن نافذ کریں',
    'Integrate voice commands': 'صوتی حکم کو یکجا کریں',
    'with robotic actions': 'روبوٹک اعمال کے ساتھ',
    'in a complete cognitive system': 'ایک مکمل کوگنیٹو سسٹم میں',
    'understanding of linear algebra': 'لکیری الجبرا کی سمجھ',
    'and calculus': 'اور حسابان',
    'Familiarity with': 'آشنائی',
    'Linux command line': 'لینکس کمانڈ لائن',
    'University-level educational content': 'جامعة کی سطح کا تعلیمی مواد',
    'for modern robotics': 'جدید روبوٹکس کے لیے',
    'Learn the fundamentals': 'بنیادیات سیکھیں',
    'including nodes, topics, services, and actions': 'نودز، ٹوپکس، سروسز، اور ایکشنز سمیت',
    'Explore simulation environments': 'سیمولیشن ماحول کو دریافت کریں',
    'and digital twin concepts': 'اور ڈیجیٹل ٹوئن تصورات',
    'Understand perception, navigation, and AI integration': 'ادراک، نیویگیشن، اور ای ۔آئی یک جہتی سمجھیں',
    'Integrate all concepts': 'تمام تصورات کو یکجا کریں',
    'in cognitive robotics': 'کوگنیٹو روبوٹکس میں',
    'with natural language interaction': 'قدرتی زبان کے تعامل کے ساتھ',
    'Robotic Nervous System (ROS 2)': 'روبوٹک نروس سسٹم (ROS 2)',
    'The Digital Twin (Gazebo & Simulation)': 'ڈیجیٹل ٹوئن (گزیبو اور سیمولیشن)',
    'The AI-Robot Brain (NVIDIA Isaac)': 'ای ۔آئی روبوٹ بین (این وی ڈی ای اسیک)',
    'Vision-Language-Action (VLA)': 'وژن لینگویج ایکشن (وی ایل اے)',
    'Robotic Systems': 'روبوٹک نظام',
    'Simulation Environments': 'سیمولیشن ماحول',
    'AI Integration': 'ای ۔آئی یک جہتی',
    'Natural Language Interaction': 'قدرتی زبان کا تعامل',
    'Robotic Environments': 'روبوٹک ماحول',
    'Navigation Systems': 'نیویگیشن سسٹم',
    'Perception Systems': 'ادراک سسٹم',
    'Action Systems': 'ایکشن سسٹم',
    'Integration Techniques': 'یک جہتی کی تکنیکیں',
    'Learning Path': 'سیکھنے کا راستہ',
    'Educational Resource': 'تعلیمی وسیلہ',
    'Modern Robotics': 'جدید روبوٹکس',
    'Cognitive Robotics': 'کوگنیٹو روبوٹکس',
    'University Level': 'جامعة کی سطح',
    'Robotics Education': 'روبوٹکس کی تعلیم',
    'AI Robotics': 'ای ۔آئی روبوٹکس',
    'Humanoid Robotics': 'ہیومنوائڈ روبوٹکس',
    'Physical AI': 'فزکل ای ۔آئی',
    'Textbook': 'ٹیکسٹ بک',
    'Modules': 'ماڈیولز',
    'Progressive Learning': 'ترقی پذیر سیکھنا',
    'Fundamental Concepts': 'بنیادی تصورات',
    'Advanced Concepts': 'اعلی تصورات',
    'Practical Applications': 'عملی اطلاق',
    'Hands-on Experience': 'ہاتھوں میں تجربہ',
    'Real-world Applications': 'حقیقی دنیا کا اطلاق',
    'Problem Solving': 'مسئلہ حل کرنا',
    'Critical Thinking': 'تنقیدی سوچ',
    'Engineering Principles': 'انجینئرنگ کے اصول',
    'Design Principles': 'ڈیزائن کے اصول',
    'Development': 'ترقی',
    'Testing': 'ٹیسٹنگ',
    'Deployment': 'تنصیب',
    'Maintenance': 'دیکھ بھال',
    'Troubleshooting': 'خرابیوں کا حل',
    'Debugging': 'ڈی باگنگ',
    'Optimization': 'بہتری',
    'Performance': 'کارکردگی',
    'Efficiency': 'کارآمدی',
    'Scalability': 'Scaler میں توسیع',
    'Reliability': 'قابل اعتمادی',
    'Security': 'سیکورٹی',
    'Safety': 'حفاظت',
    'Ethics': 'اخلاقیات',
    'Standards': 'معیارات',
    'Protocols': 'پروٹوکول',
    'Algorithms': 'الگورتھم',
    'Data Structures': 'ڈیٹا سٹرکچر',
    'Machine Learning': 'مشین لرننگ',
    'Deep Learning': 'گہرا لرننگ',
    'Computer Vision': 'کمپیوٹر وژن',
    'Natural Language Processing': 'قدرتی زبان کی پروسیسنگ',
    'Speech Recognition': 'speech کی پہچان',
    'Motion Planning': 'موشن منصوبہ بندی',
    'Path Planning': 'راستہ منصوبہ بندی',
    'Control Systems': 'کنٹرول سسٹم',
    'Feedback Control': 'فیڈ بیک کنٹرول',
    'Sensors': 'سینسرز',
    'Actuators': 'ایکچوایٹرز',
    'Hardware': 'ہارڈ ویئر',
    'Software': 'سافٹ ویئر',
    'Integration': 'یک جہتی',
    'Communication': 'اتصال',
    'Networking': 'نیٹ ورکنگ',
    'Cloud Computing': 'کلاؤڈ کمپیوٹنگ',
    'Edge Computing': 'ایج کمپیوٹنگ',
    'IoT': 'آئی او ٹی',
    'Big Data': 'بڑا ڈیٹا',
    'Analytics': 'تحلیل',
    'Visualization': 'منظر کاری',
    'Simulation': 'سیمولیشن',
    'Modeling': 'ماڈلنگ',
    'Testing Frameworks': 'ٹیسٹنگ فریم ورکس',
    'Quality Assurance': 'معیار کی ضمانت',
    'Documentation': 'دستاویزات',
    'Collaboration': 'تعاون',
    'Teamwork': 'ٹیم ورک',
    'Project Management': 'پروجیکٹ مینجمنٹ',
    'Leadership': 'قیادت',
    'Communication Skills': 'اتصال کی مہارت',
    'Presentation Skills': 'پیشکش کی مہارت',
    'Technical Writing': 'فنی لکھائی',
    'Research Skills': 'تحقیقی مہارت',
    'Innovation': 'نوآوری',
    'Creativity': 'تخلیقیت',
    'Problem Identification': 'مسئلہ کی شناخت',
    'Solution Design': 'حل کا ڈیزائن',
    'Implementation': 'نفاذ',
    'Evaluation': 'جائزہ',
    'Assessment': 'جائزہ',
    'Feedback': 'فیڈ بیک',
    'Improvement': 'بہتری',
    'Continuous Learning': 'مسلسل سیکھنا',
    'Professional Development': 'پیشہ ورانہ ترقی',
    'Career Advancement': 'کیریئر میں ترقی',
    'Industry Trends': 'صنعت کے رجحانات',
    'Emerging Technologies': 'نوعمر ٹیکنالوجی',
    'Future Technologies': 'مستقبل کی ٹیکنالوجی',
    'Technology Trends': 'ٹیکنالوجی کے رجحانات',
    'Innovation Trends': 'نوآوری کے رجحانات',
    'Market Trends': 'مارکیٹ کے رجحانات',
    'Global Trends': 'عالمی رجحانات',
    'Local Trends': 'مقامی رجحانات',
    'Regional Trends': 'علاقائی رجحانات',
    'National Trends': 'قومی رجحانات',
    'International Trends': 'بین الاقوامی رجحانات',
    'Worldwide Trends': 'دنیا بھر کے رجحانات'
  };

  if (language === 'ur') {
    // Return translated content if available, otherwise return original
    // Also handle partial matches by splitting the content into words and translating them
    const contentStr = String(content);

    // Check if exact phrase exists
    if (urduTranslations[contentStr]) {
      return urduTranslations[contentStr];
    }

    // For more complex content, try to translate individual words/fragments
    let translatedContent = contentStr;
    for (const [english, urdu] of Object.entries(urduTranslations)) {
      if (contentStr.includes(english)) {
        translatedContent = translatedContent.replace(new RegExp(english, 'gi'), urdu);
      }
    }

    return translatedContent;
  }
  return content;
};

export const updateUserProfile = async (email, profileData) => {
  try {
    // In a real implementation, this would call your backend API
    // For now, we'll store in localStorage
    const profileKey = `user-profile-${email}`;
    const existing = JSON.parse(localStorage.getItem(profileKey) || '{}');
    const updatedProfile = {
      ...existing,
      ...profileData,
      updated_at: new Date().toISOString()
    };

    localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Mock API endpoints for development
export const mockApi = {
  get: async (endpoint) => {
    if (endpoint.startsWith('/api/user-preferences/')) {
      const userId = endpoint.split('/').pop();
      return await getUserPreferences(userId);
    }
    throw new Error(`Unknown endpoint: ${endpoint}`);
  },

  put: async (endpoint, data) => {
    if (endpoint === '/api/user-preferences') {
      const { user_id, ...preferences } = data;
      return await updateUserPreferences(user_id, preferences);
    } else if (endpoint === '/api/user-profile') {
      const { email, ...profileData } = data;
      return await updateUserProfile(email, profileData);
    }
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }
};