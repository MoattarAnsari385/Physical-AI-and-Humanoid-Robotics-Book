import React from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Layout title="Profile" description="Your profile information">
      <ProtectedRoute>
        <div style={{
          minHeight: '100vh',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)',
          color: '#ffffff',
          padding: '2rem 0'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: user.avatarColor || '#E00070',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '32px',
                fontWeight: 'bold'
              }}>
                {user.email ? user.email.charAt(0).toUpperCase() : '?'}
              </div>
              <h1 style={{
                color: '#E00070',
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>
                {user.email}
              </h1>
              <p style={{ color: '#9ca3af' }}>
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '2rem',
              border: '1px solid rgba(224, 0, 112, 0.2)'
            }}>
              <h2 style={{
                color: '#E00070',
                marginBottom: '1.5rem',
                fontSize: '1.5rem'
              }}>
                Background Information
              </h2>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#FF7A00', marginBottom: '0.5rem' }}>Programming Experience</h3>
                <p>{user.programmingExperience || 'Not provided'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#FF7A00', marginBottom: '0.5rem' }}>Primary Languages/Frameworks</h3>
                <p>{user.primaryLanguages && user.primaryLanguages.length > 0 ? user.primaryLanguages.join(', ') : 'Not provided'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#FF7A00', marginBottom: '0.5rem' }}>NVIDIA GPU Access</h3>
                <p>{user.hasNvidiaGPU ? 'Yes' : 'No'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#FF7A00', marginBottom: '0.5rem' }}>Owned Devices</h3>
                <p>{user.ownsDevices && user.ownsDevices.length > 0 ? user.ownsDevices.join(', ') : 'None'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#FF7A00', marginBottom: '0.5rem' }}>Experience Level</h3>
                <p>{user.experienceLevel || 'Not provided'}</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#FF7A00', marginBottom: '0.5rem' }}>Theme Preference</h3>
                <p>{user.theme || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default ProfilePage;