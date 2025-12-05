// frontend/src/components/EmailTemplate.tsx
import { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { fetchWithSuspense } from '../utils/suspense';

// This function can be used to preload the template data
const preloadTemplate = () => {
  return fetchWithSuspense<{ subject: string; html: string }>(
    'http://localhost:8000/api/email-template'
  )();
};

interface EmailTemplateProps {
  onClose: () => void;
  onSave: (data: { subject: string; template: string }) => void;
  currentTemplate?: string;
  currentSubject?: string;
  variables?: Record<string, string>;
}

function EmailTemplate({ 
  onClose, 
  onSave, 
  currentTemplate = '', 
  currentSubject = '',
  variables = {} 
}: EmailTemplateProps) {
  const [subject, setSubject] = useState(currentSubject);
  const [template, setTemplate] = useState(currentTemplate);
  const [isLoading, setIsLoading] = useState(true);

  // Load template data if not provided
  useEffect(() => {
    const loadTemplate = async () => {
      if (!currentTemplate || !currentSubject) {
        try {
          const data = await preloadTemplate();
          if (!currentSubject) setSubject(data.subject || '');
          if (!currentTemplate) setTemplate(data.html || '');
        } catch (error) {
          console.error('Error loading template:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadTemplate();
  }, [currentTemplate, currentSubject]);

  const handleSave = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:8000/api/email-template', {
        subject,
        html: template,
        text: template.replace(/<[^>]*>/g, '') // Basic HTML to text conversion
      });
      
      onSave?.({ subject, template });
      onClose();
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
      throw error; // This will be caught by ErrorBoundary if needed
    } finally {
      setIsLoading(false);
    }
  }, [subject, template, onSave, onClose]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Email Template</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Email subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Body (HTML)
          </label>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full h-64 p-2 border rounded font-mono"
            placeholder="<p>Your email content here...</p>"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailTemplate;