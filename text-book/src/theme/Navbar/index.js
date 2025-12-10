import React from 'react';
import Navbar from '@theme-original/Navbar';
import ProfileDropdown from '../../components/ProfileDropdown';

const CustomNavbar = (props) => {
  // Safely use the auth context with error handling
  const useAuthSafely = () => {
    try {
      // Dynamically import the hook to handle cases where context isn't available yet
      const { useAuth } = require('../../contexts/AuthContext');
      return useAuth();
    } catch (error) {
      // Return default values if context is not available
      return { user: null, loading: false };
    }
  };

  const { user, loading } = useAuthSafely();

  return (
    <>
      <Navbar {...props} />
      {/* Show profile dropdown or account links in top right */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000
      }}>
        {!loading && user ? (
          <ProfileDropdown />
        ) : !loading ? (
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <a
              href="/signin"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                border: '1px solid #E00070',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(224, 0, 112, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              Sign In
            </a>
            <a
              href="/signup"
              style={{
                background: 'linear-gradient(45deg, #E00070, #FF7A00)',
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            >
              Sign Up
            </a>
          </div>
        ) : (
          // Show loading state while checking auth status
          <div style={{
            padding: '0.5rem 1rem',
            color: 'white',
            fontSize: '0.9rem'
          }}>
            Loading...
          </div>
        )}
      </div>
    </>
  );
};

export default CustomNavbar;