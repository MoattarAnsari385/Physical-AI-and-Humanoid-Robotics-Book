import React, { useState } from 'react';

const ProfileDropdown = () => {
  // Safely use the auth context with error handling
  const useAuthSafely = () => {
    try {
      const { useAuth } = require('../contexts/AuthContext');
      return useAuth();
    } catch (error) {
      // Return default values if context is not available
      return { user: null, signout: () => {}, updateUser: () => {} };
    }
  };

  const { user, signout, updateUser } = useAuthSafely();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(user?.theme || 'dark');

  if (!user) return null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = async () => {
    await signout();
    window.location.href = '/signin';
  };

  const handleThemeChange = async (newTheme) => {
    try {
      if (updateUser) {
        await updateUser({ theme: newTheme });
      }
      setTheme(newTheme);
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  // Get first letter of email for avatar
  const avatarLetter = user.email ? user.email.charAt(0).toUpperCase() : '?';
  const avatarColor = user.avatarColor || '#E00070';

  return (
    <div className="profile-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={toggleDropdown}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          background: avatarColor,
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        title="User Profile"
      >
        {avatarLetter}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          minWidth: '200px',
          marginTop: '0.5rem'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #eee',
            fontWeight: '500',
            color: '#333'
          }}>
            {user.email}
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            <button
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/profile';
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              View Profile
            </button>

            <div style={{ padding: '0.5rem 1rem', fontSize: '14px', color: '#666' }}>
              Theme:
            </div>
            <div style={{ display: 'flex', padding: '0 1rem 0.5rem' }}>
              <button
                onClick={() => handleThemeChange('light')}
                style={{
                  flex: 1,
                  padding: '0.25rem 0.5rem',
                  border: theme === 'light' ? '2px solid #E00070' : '1px solid #ddd',
                  borderRadius: '4px',
                  marginRight: '0.25rem',
                  background: theme === 'light' ? '#f0f0f0' : 'white',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                style={{
                  flex: 1,
                  padding: '0.25rem 0.5rem',
                  border: theme === 'dark' ? '2px solid #E00070' : '1px solid #ddd',
                  borderRadius: '4px',
                  marginLeft: '0.25rem',
                  background: theme === 'dark' ? '#f0f0f0' : 'white',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Dark
              </button>
            </div>

            <button
              onClick={handleSignout}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#d32f2f',
                borderTop: '1px solid #eee'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ffebee'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;