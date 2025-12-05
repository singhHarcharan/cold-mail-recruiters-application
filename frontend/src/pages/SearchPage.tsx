import React, { useState, useEffect } from 'react';
import { recruiters as allRecruiters } from '../data/recruiters';
import RecruiterTable from '../components/RecruiterTable';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { filterRecruiters } from '../utils/filtering';
import { FilterOptions } from '../types';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    locations: [],
    companies: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recruitersPerPage, setRecruitersPerPage] = useState(10);

  const getAvailableFilters = () => {
    const locations = Array.from(new Set(allRecruiters.map(r => r.location)));
    const companies = Array.from(new Set(allRecruiters.map(r => r.company)));
    
    return {
      locations,
      companies,
    };
  };

  const filteredRecruiters = filterRecruiters(allRecruiters, searchTerm, filters);
  
  // Get current recruiters for pagination
  const indexOfLastRecruiter = currentPage * recruitersPerPage;
  const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
  const currentRecruiters = filteredRecruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, recruitersPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setRecruitersPerPage(newItemsPerPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar
            availableFilters={getAvailableFilters()}
            selectedFilters={filters}
            onFilterChange={setFilters}
          />
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recruiters</h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredRecruiters.length} recruiters found
              </p>
            </div>
            
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;