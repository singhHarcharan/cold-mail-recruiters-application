import React, { useState } from 'react';
import { Bookmark, Mail } from 'lucide-react';
import { useSavedRecruiters } from '../context/SavedRecruitersContext';
import { useSelectedRecruiters } from '../context/SelectedRecruitersContext';
import EmailButton from './EmailButton';
import SaveButton from './SaveButton';
import { Recruiter } from '../types';

interface RecruiterTableProps {
  recruiters: Recruiter[];
}

const RecruiterTable: React.FC<RecruiterTableProps> = ({ recruiters }) => {
  const { savedRecruiters, toggleSaved } = useSavedRecruiters();
  const { selectedRecruiters, toggleSelected, selectAll, deselectAll } = useSelectedRecruiters();
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAll = () => {
    if (selectAllChecked) {
      deselectAll();
      setSelectAllChecked(false);
    } else {
      selectAll(recruiters);
      setSelectAllChecked(true);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <input
            id="select-all"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            checked={selectAllChecked}
            onChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Select All
          </label>
        </div>
        <div className="flex space-x-2">
          {selectedRecruiters.length > 0 && (
            <EmailButton emails={selectedRecruiters.map(r => r.email)} />
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recruiters.map((recruiter) => {
              const isSelected = selectedRecruiters.some(r => r.id === recruiter.id);
              const isSaved = savedRecruiters.some(r => r.id === recruiter.id);

              return (
                <tr 
                  key={recruiter.id} 
                  className={`${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors duration-150`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      checked={isSelected}
                      onChange={() => toggleSelected(recruiter)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{recruiter.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{recruiter.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{recruiter.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex">
                    <SaveButton 
                      isSaved={isSaved}
                      onClick={() => toggleSaved(recruiter)}
                    />
                    <a 
                      href={`mailto:${recruiter.email}`}
                      className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {recruiters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No recruiters found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default RecruiterTable;