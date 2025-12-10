import React, { useEffect, useRef, useLayoutEffect } from 'react';

const PersonalizedContent = ({ children }) => {
  const containerRef = useRef(null);

  // Get preferences from localStorage
  const language = localStorage.getItem('preferred-language') || 'en';
  const level = localStorage.getItem('preferred-level') || 'intermediate';

  // Set direction based on language for RTL support
  const isRTL = language === 'ur';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';

  useLayoutEffect(() => {
    if (containerRef.current) {
      // Show/hide content based on user level
      const levelElements = containerRef.current.querySelectorAll('[data-level]');
      levelElements.forEach(el => {
        const elLevel = el.getAttribute('data-level');
        if (elLevel === level || elLevel === 'all') {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      });

      // Apply translation if language is Urdu
      if (language === 'ur') {
        // For now, just apply RTL styling - full translation would require more complex implementation
        // In a real implementation, we'd translate the content here
      }
    }
  }, [level, language]);

  return (
    <div
      ref={containerRef}
      className="personalized-content"
      dir={direction}
      style={{
        direction: direction,
        textAlign: textAlign,
        fontFamily: language === 'ur'
          ? '"Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", "Urdu Typesetting", serif'
          : 'inherit'
      }}
    >
      {children}
    </div>
  );
};

export default PersonalizedContent;