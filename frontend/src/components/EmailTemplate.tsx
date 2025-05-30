import { useState } from "react";

interface EmailTemplateProps {
  onClose: () => void;
  onSave: (data: { subject: string; template: string }) => void;
  currentTemplate?: string;
  currentSubject?: string;
}

function EmailTemplate({ onClose, onSave, currentTemplate, currentSubject }: EmailTemplateProps) {
  const [subject, setSubject] = useState(currentSubject || '');
  const [template, setTemplate] = useState(currentTemplate || '');

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

        <div className="space-y-2">
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">
            Email Template
          </label>
          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email subject..."
              />
            </div>

            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                Email Template
              </label>
              <textarea
                id="template"
                name="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your email template here..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ subject, template });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailTemplate;
