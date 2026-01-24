import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, BookmarkCheck, Mail, FileText, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import InputBoxes from './InputBoxes';
import EmailTemplate from './EmailTemplate';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('');
  const [currentSubject, setCurrentSubject] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleEmailTemplateClose = () => {
    setOpenTemplateModal(false);
  };

  const handleSaveTemplate = ({ subject, template }: { subject: string; template: string }) => {
    setCurrentSubject(subject);
    setCurrentTemplate(template);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'User';
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
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img src="/message.png" alt="Recruiter Hub Logo" className="h-8 w-8" />
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
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={getUserDisplayName()}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <span className="hidden md:block">{getUserDisplayName()}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                      {currentUser?.email && (
                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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