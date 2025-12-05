// src/pages/EmailTemplatesPage.tsx
import React, { useState, useEffect, Suspense, lazy, ReactNode } from 'react';
import axios from 'axios';

// Lazy load the EmailTemplate component with Suspense
const EmailTemplate = lazy(() => import('../components/EmailTemplate'));

// Error boundary for handling errors in Suspense
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in EmailTemplate:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const EmailTemplatesPage = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({
    subject: '',
    html: '',
    text: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get('/api/email-templates');
        if (response.data) {
          setCurrentTemplate({
            subject: response.data.subject || '',
            html: response.data.html || '',
            text: response.data.text || ''
          });
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, []);

  const handleSaveTemplate = async (data: { subject: string; template: string }) => {
    try {
      // Create the data object that matches the server's expected format
      const saveData = {
        subject: data.subject,
        html: data.template,
        text: data.template // Using template for both html and text for simplicity
      };
      
      await axios.post('/api/email-templates', saveData);
      setCurrentTemplate(saveData);
      setShowEditor(false);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading email template...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <ErrorBoundary fallback={
          <div className="p-4 bg-red-50 text-red-700 rounded">
            Failed to load email template. Please try refreshing the page.
          </div>
        }>
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3">Loading email template...</span>
            </div>
          }>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Email Templates</h1>
          <div className="flex justify-between items-center mb-6">
            {!showEditor && (
              <button
                onClick={() => setShowEditor(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Template
              </button>
            )}
          </div>

          {showEditor ? (
            <EmailTemplate
              onClose={() => setShowEditor(false)}
              onSave={handleSaveTemplate}
              currentTemplate={currentTemplate.html}
              currentSubject={currentTemplate.subject}
              variables={{
                fullName: 'Recruiter Name',
                companyName: 'Company Name',
                email: 'recruiter@example.com'
              }}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentTemplate.subject || 'No Subject'}
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentTemplate.html || '<p>No template content available.</p>' }}
              />
            </div>
          )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default EmailTemplatesPage;