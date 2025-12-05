import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, BookmarkCheck, Mail, FileText } from 'lucide-react';
import Modal from './Modal';
import InputBoxes from './InputBoxes';
import EmailTemplate from './EmailTemplate';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('');
  const [currentSubject, setCurrentSubject] = useState('');

  const handleEmailTemplateClose = () => {
    setOpenTemplateModal(false);
  };

  const handleSaveTemplate = ({ subject, template }: { subject: string; template: string }) => {
    setCurrentSubject(subject);
    setCurrentTemplate(template);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InputBoxes onClose={() => setIsModalOpen(false)} />
      </Modal>
      <Modal isOpen={openTemplateModal} onClose={handleEmailTemplateClose}>
        <EmailTemplate 
          onClose={handleEmailTemplateClose} 
          onSave={handleSaveTemplate}
          currentTemplate={currentTemplate}
          currentSubject={currentSubject}
        />
      </Modal>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Recruiter Hub</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setOpenTemplateModal(true)
                  console.log("Email Template clicked");
                }}
                className="email-template px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Email Template</span>
                </div>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Send to Individual</span>
                </div>
              </button>
              <NavLink
                to="/searchpage"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Browse</span>
                </div>
              </NavLink>
              <NavLink
                to="/saved"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <div className="flex items-center">
                  <BookmarkCheck className="h-4 w-4 mr-1" />
                  <span>Saved</span>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      {/* <div className="flex items-center justify-center h-screen">
      <button className="w-40 h-10 bg-blue-600 text-white px-4 py-2 rounded-md">Get Started</button>
    </div> */}
    </>
  );
};

export default Header;