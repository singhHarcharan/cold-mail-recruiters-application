import React from 'react';
import { FilterIcon, X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterSidebarProps {
  availableFilters: {
    locations: string[];
    companies: string[];
  };
  selectedFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  availableFilters,
  selectedFilters,
  onFilterChange,
}) => {
  const handleLocationChange = (location: string) => {
    const newLocations = selectedFilters.locations.includes(location)
      ? selectedFilters.locations.filter(l => l !== location)
      : [...selectedFilters.locations, location];
    
    onFilterChange({
      ...selectedFilters,
      locations: newLocations,
    });
  };

  const handleCompanyChange = (company: string) => {
    const newCompanies = selectedFilters.companies.includes(company)
      ? selectedFilters.companies.filter(c => c !== company)
      : [...selectedFilters.companies, company];
    
    onFilterChange({
      ...selectedFilters,
      companies: newCompanies,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      locations: [],
      companies: [],
    });
  };

  const hasFilters = selectedFilters.locations.length > 0 || selectedFilters.companies.length > 0;

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <FilterIcon className="w-5 h-5 mr-2 text-gray-500" />
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {availableFilters.locations.map(location => (
              <div key={location} className="flex items-center">
                <input
                  id={`location-${location}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={selectedFilters.locations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                />
                <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Company Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Company</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {availableFilters.companies.map(company => (
              <div key={company} className="flex items-center">
                <input
                  id={`company-${company}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={selectedFilters.companies.includes(company)}
                  onChange={() => handleCompanyChange(company)}
                />
                <label htmlFor={`company-${company}`} className="ml-2 text-sm text-gray-700">
                  {company}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">
              {selectedFilters.locations.length + selectedFilters.companies.length}
            </span> filters applied
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;