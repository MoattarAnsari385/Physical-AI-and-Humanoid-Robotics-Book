import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthNavbarItem = () => {
  const { user, loading, signout } = useAuth();

  if (loading) {
    return (
      <div style={{
        padding: '0.5rem 1rem',
        color: 'white',
        fontSize: '0.875rem'
      }}>
        Loading...
      </div>
    );
  }

  if (user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem'
      }}>
        <span style={{ color: 'white', fontSize: '0.875rem' }}>
          Welcome, {user.email.split('@')[0]}
        </span>
        <button
          onClick={signout}
          style={{
            padding: '0.25rem 0.5rem',
            background: 'linear-gradient(45deg, #E00070, #FF7A00)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '0.25rem 0'
    }}>
      <a
        href="/signin"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '0.875rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(224, 0, 112, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        Sign In
      </a>
      <a
        href="/signup"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '0.875rem',
          padding: '0.5rem 1rem',
          background: 'linear-gradient(45deg, #E00070, #FF7A00)',
          borderRadius: '4px',
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '1';
        }}
      >
        Sign Up
      </a>
    </div>
  );
};

export default AuthNavbarItem;