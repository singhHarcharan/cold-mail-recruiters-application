import React from 'react';
import { Mail } from 'lucide-react';

interface EmailButtonProps {
  emails: string[];
}

const EmailButton: React.FC<EmailButtonProps> = ({ emails }) => {
  const handleEmailClick = () => {
    const mailtoLink = `mailto:?bcc=${emails.join(',')}`;
    window.location.href = mailtoLink;
  };

  return (
    <button
      onClick={handleEmailClick}
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
    >
      <Mail className="mr-2 h-4 w-4" />
      Email Selected
    </button>
  );
};

export default EmailButton;