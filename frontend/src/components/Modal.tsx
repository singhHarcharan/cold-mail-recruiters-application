import React from 'react';
import { Mail } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  console.log("Modal opened");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal content */}
      <div className="relative z-10 bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
        
        <div className="mail-icon flex items-center justify-between mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
