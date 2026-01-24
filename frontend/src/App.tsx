//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedRecruitersProvider } from './context/SavedRecruitersContext';
import { SelectedRecruitersProvider } from './context/SelectedRecruitersContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SavedPage from './pages/SavedPage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { Analytics } from '@vercel/analytics/react';
// Import InputBoxes is no longer needed since it's used as a modal

function App() {
  return (
//     <div className="bg-gray-100 min-h-screen flex justify-items-end">
//       <Dashboard />
//     </div>
    <Router>
      <AuthProvider>
        <SavedRecruitersProvider>
          <SelectedRecruitersProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                      <Header />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<SearchPage />} />
                          <Route path="/saved" element={<SavedPage />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Analytics />
          </SelectedRecruitersProvider>
        </SavedRecruitersProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;