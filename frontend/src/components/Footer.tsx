import { Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" py-12 px-4 md:px-6">
      <div className="container mx-auto">
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <div className='flex items-center'>
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Recruiter Hub</h1>
          </div>
          <p className="text-sm dark:text-gray-400 mt-5">
            © {new Date().getFullYear()} Recruiter Hub. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center space-x-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-9">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800  dark:hover:text-blue-600">
                    Docs
                  </NavLink >
                </li>
                <li>
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                    Components
                  </NavLink >
                </li>
                <li>
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                    Examples
                  </NavLink >
                </li>
                <li>
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                    Pricing
                  </NavLink >
                </li>
                <li>
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
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
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
                    Github
                  </NavLink >
                </li>
                <li>
                  <NavLink to="/" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
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
                  <NavLink to="/privacy-policy" className="text-gray-800 hover:text-black dark:text-gray-800 dark:hover:text-blue-600">
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
      </div>
    </footer>
  );
}

export default Footer;