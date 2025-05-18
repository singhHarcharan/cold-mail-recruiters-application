import React, { useState } from 'react';
import { useSavedRecruiters } from '../context/SavedRecruitersContext';
import RecruiterTable from '../components/RecruiterTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Recruiter } from '../types';
import { filterRecruiters } from '../utils/filtering';

const SavedPage: React.FC = () => {
  const { savedRecruiters } = useSavedRecruiters();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recruitersPerPage, setRecruitersPerPage] = useState(10);

  const filteredRecruiters = filterRecruiters(
    savedRecruiters, 
    searchTerm, 
    { locations: [], companies: [] }
  );

  // Get current recruiters for pagination
  const indexOfLastRecruiter = currentPage * recruitersPerPage;
  const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
  const currentRecruiters = filteredRecruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setRecruitersPerPage(newItemsPerPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Recruiters</h1>
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Saved Recruiters</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredRecruiters.length} recruiters saved
          </p>
        </div>
        
        {savedRecruiters.length > 0 ? (
          <>
            <RecruiterTable recruiters={currentRecruiters} />
            
            <div className="p-4 border-t border-gray-200">
              <Pagination 
                itemsPerPage={recruitersPerPage}
                totalItems={filteredRecruiters.length}
                currentPage={currentPage}
                paginate={paginate}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No saved recruiters</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't saved any recruiters yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;