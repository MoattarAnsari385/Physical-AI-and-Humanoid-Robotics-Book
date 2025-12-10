import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BackgroundSurvey = () => {
  const { user, loading, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    programmingExperience: '',
    primaryLanguages: [],
    hasNvidiaGPU: false,
    ownsDevices: [],
    experienceLevel: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        programmingExperience: user.programmingExperience || '',
        primaryLanguages: user.primaryLanguages || [],
        hasNvidiaGPU: user.hasNvidiaGPU || false,
        ownsDevices: user.ownsDevices || [],
        experienceLevel: user.experienceLevel || '',
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        textAlign: 'center'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    window.location.href = '/signin';
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'primaryLanguages' || name === 'ownsDevices') {
      // Handle multi-select
      const options = Array.from(e.target.selectedOptions || []);
      const selectedValues = options.map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedValues
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        ...formData
      });
      setSuccess(true);
      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while saving your information');
    }
  };

  return (
    <div className="background-survey" style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'white'
    }}>
      <h2 style={{
        color: '#E00070',
        textAlign: 'center',
        marginBottom: '1.5rem'
      }}>
        Background Survey
      </h2>

      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
        Please complete this survey to personalize your learning experience
      </p>

      {success && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Information saved successfully! Redirecting to home...
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="programmingExperience" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Years of programming experience?
          </label>
          <select
            id="programmingExperience"
            name="programmingExperience"
            value={formData.programmingExperience}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="">Select your experience</option>
            <option value="<1">&lt;1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Primary languages/frameworks you know? (Select all that apply)
          </label>
          <select
            multiple
            name="primaryLanguages"
            onChange={handleChange}
            value={formData.primaryLanguages}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              height: 'auto'
            }}
          >
            <option value="JavaScript/TypeScript">JavaScript/TypeScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="ROS">ROS</option>
            <option value="React">React</option>
            <option value="Next.js">Next.js</option>
          </select>
          <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
            Hold Ctrl/Cmd to select multiple options
          </small>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Do you have access to NVIDIA GPU?
          </label>
          <label style={{ display: 'inline-block', marginRight: '1rem' }}>
            <input
              type="radio"
              name="hasNvidiaGPU"
              value="true"
              checked={formData.hasNvidiaGPU === true}
              onChange={handleChange}
            />
            Yes
          </label>
          <label style={{ display: 'inline-block' }}>
            <input
              type="radio"
              name="hasNvidiaGPU"
              value="false"
              checked={formData.hasNvidiaGPU === false}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Do you own any of these? (Select all that apply)
          </label>
          <select
            multiple
            name="ownsDevices"
            onChange={handleChange}
            value={formData.ownsDevices}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              height: 'auto'
            }}
          >
            <option value="Jetson Orin Nano/AGX">Jetson Orin Nano/AGX</option>
            <option value="RealSense camera">RealSense camera</option>
            <option value="Raspberry Pi 5">Raspberry Pi 5</option>
            <option value="Any humanoid robot kit">Any humanoid robot kit</option>
            <option value="None">None</option>
          </select>
          <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
            Hold Ctrl/Cmd to select multiple options
          </small>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="experienceLevel" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Current level in Robotics/AI?
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="">Select your level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(45deg, #E00070, #FF7A00)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default BackgroundSurvey;