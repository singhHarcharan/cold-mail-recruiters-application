import { Recruiter, FilterOptions } from '../types';

export const filterRecruiters = (
  recruiters: Recruiter[],
  searchTerm: string,
  filters: FilterOptions
): Recruiter[] => {
  // First apply search term filter
  let filtered = recruiters;
  
  if (searchTerm) {
    const lowercasedSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(
      recruiter =>
        recruiter.name.toLowerCase().includes(lowercasedSearch) ||
        recruiter.company.toLowerCase().includes(lowercasedSearch) ||
        recruiter.location.toLowerCase().includes(lowercasedSearch) ||
        recruiter.email.toLowerCase().includes(lowercasedSearch)
    );
  }

  // Then apply location filter if any locations are selected
  if (filters.locations.length > 0) {
    filtered = filtered.filter(recruiter =>
      filters.locations.includes(recruiter.location)
    );
  }

  // Then apply company filter if any companies are selected
  if (filters.companies.length > 0) {
    filtered = filtered.filter(recruiter =>
      filters.companies.includes(recruiter.company)
    );
  }

  return filtered;
};