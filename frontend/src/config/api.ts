// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/sendEmail`,
  EMAIL_TEMPLATE: `${API_BASE_URL}/api/email-template`,
};

export default API_BASE_URL;
