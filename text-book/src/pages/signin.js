import React from 'react';
import Layout from '@theme/Layout';
import SignInForm from '../components/SignInForm';

const SigninPage = () => {
  return (
    <Layout title="Sign In" description="Sign in to your RoboMind AI Textbook account">
      <div style={{
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)',
        color: '#ffffff',
        transition: 'all 0.5s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Main Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <SignInForm />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(224, 0, 112, 0.2)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(45deg, #E00070, #FF7A00)',
              margin: '0.8rem auto 1.5rem auto',
              borderRadius: '2px'
            }}></div>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              lineHeight: '1.4'
            }}>
              Book Series & Hackathon • AI & Robotics Development
            </p>
            <p style={{
              color: '#6b7280',
              fontSize: '0.75rem'
            }}>
              © 2025 RoboMind AI Textbook
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SigninPage;