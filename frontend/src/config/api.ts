// API configuration
import { auth } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-client-email`,  // Updated to use the new endpoint
  EMAIL_TEMPLATE: `${API_BASE_URL}/api/email-template`,
};

// Helper function to get auth token for API requests
export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }
  return null;
};

// Helper function to create authenticated fetch options
export const getAuthHeaders = async (): Promise<HeadersInit> => {
  const token = await getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export default API_BASE_URL;
