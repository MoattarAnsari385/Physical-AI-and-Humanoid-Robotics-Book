import React, { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    // Redirect to the new signin page
    window.location.href = '/signin';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)',
      color: '#ffffff'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem'
      }}>
        <p>Redirecting to sign in page...</p>
      </div>
    </div>
  );
};

export default LoginPage;