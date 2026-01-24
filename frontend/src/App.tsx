//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SavedRecruitersProvider } from './context/SavedRecruitersContext';
import { SelectedRecruitersProvider } from './context/SelectedRecruitersContext';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import SavedPage from './pages/SavedPage';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';
// Import InputBoxes is no longer needed since it's used as a modal

function App() {
  return (
//     <div className="bg-gray-100 min-h-screen flex justify-items-end">
//       <Dashboard />
//     </div>
    <Router>
      <SavedRecruitersProvider>
        <SelectedRecruitersProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/saved" element={<SavedPage />} />
              </Routes>
            </main>
          </div>
          <Footer />
          <Analytics />
        </SelectedRecruitersProvider>
      </SavedRecruitersProvider>
    </Router>
  );
}

export default App;