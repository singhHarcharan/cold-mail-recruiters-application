//import React from 'react'
import { Users } from 'lucide-react';


import { NavLink } from 'react-router-dom';


  const Footer = () => {
    return (
      <footer className=" py-12 px-4 md:px-6">
        <div className="container mx-auto">
        </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
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
            </NavLink>
            <br></br>
              <p className="text-sm dark:text-gray-400 mt-5">
                © {new Date().getFullYear()} Recruiter Hub. All rights reserved.
              </p>
              <br></br>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-9">
              <div>
                <h3 className="font-semibold mb-4">Pages</h3>
                <ul className="space-y-2">
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800  dark:hover:text-blue-600">
                      Docs
                    </NavLink >
                  </li>
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Components
                    </NavLink >
                  </li>
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Examples
                    </NavLink >
                  </li>
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Pricing
                    </NavLink >
                  </li>
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Blog
                    </NavLink >
                  </li>
                </ul>
              </div>
              <br></br>
              <div>
                <h3 className="font-semibold mb-4">Socials</h3>
                <ul className="space-y-2">
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Github
                    </NavLink >
                  </li>
                  <li>
                    <NavLink  to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      LinkedIn
                    </NavLink >
                  </li>
                  <li>
                    <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      X
                    </NavLink >
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <NavLink  to="/privacy-policy" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Privacy Policy
                    </NavLink >
                  </li>
                  <li>
                    <NavLink to="/tos" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                      Terms of Service
                    </NavLink >
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <br></br>
          <br></br>
          <div className=" w-full flex mt-4 items-center justify-center   ">
            <h1 className="text-center text-1xl md:text-5xl lg:text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
              RECRUITER HUB
            </h1>
          </div>
        </div>
      </footer>
    );
  }

export default Footer;