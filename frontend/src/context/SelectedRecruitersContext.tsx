import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recruiter } from '../types';

interface SelectedRecruitersContextType {
  selectedRecruiters: Recruiter[];
  toggleSelected: (recruiter: Recruiter) => void;
  selectAll: (recruiters: Recruiter[]) => void;
  deselectAll: () => void;
}

const SelectedRecruitersContext = createContext<SelectedRecruitersContextType | undefined>(undefined);

export const useSelectedRecruiters = () => {
  const context = useContext(SelectedRecruitersContext);
  if (!context) {
    throw new Error('useSelectedRecruiters must be used within a SelectedRecruitersProvider');
  }
  return context;
};

interface SelectedRecruitersProviderProps {
  children: ReactNode;
}

export const SelectedRecruitersProvider: React.FC<SelectedRecruitersProviderProps> = ({ children }) => {
  const [selectedRecruiters, setSelectedRecruiters] = useState<Recruiter[]>([]);

  const toggleSelected = (recruiter: Recruiter) => {
    setSelectedRecruiters(prev => {
      const isAlreadySelected = prev.some(r => r.id === recruiter.id);
      
      if (isAlreadySelected) {
        return prev.filter(r => r.id !== recruiter.id);
      } else {
        return [...prev, recruiter];
      }
    });
  };

  const selectAll = (recruiters: Recruiter[]) => {
    setSelectedRecruiters(recruiters);
  };

  const deselectAll = () => {
    setSelectedRecruiters([]);
  };

  return (
    <SelectedRecruitersContext.Provider value={{ 
      selectedRecruiters, 
      toggleSelected,
      selectAll,
      deselectAll
    }}>
      {children}
    </SelectedRecruitersContext.Provider>
  );
};