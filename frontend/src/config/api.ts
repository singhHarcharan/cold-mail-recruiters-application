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

// Function to send email from the client side
export const sendClientEmail = async (emailData: {
  to: string;
  fullName: string;
  companyName: string;
}): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(API_ENDPOINTS.SEND_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(emailData),
      credentials: 'include', // Important for cookies if you're using them
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return {
      success: true,
      message: data.message || 'Email sent successfully',
      data: data.data
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};

export default API_BASE_URL;
