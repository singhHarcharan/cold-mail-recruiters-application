import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, BookmarkCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Recruiter Hub</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive 
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
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive 
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
  );
};

export default Header;