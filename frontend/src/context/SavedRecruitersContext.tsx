import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recruiter } from '../types';

interface SavedRecruitersContextType {
  savedRecruiters: Recruiter[];
  toggleSaved: (recruiter: Recruiter) => void;
}

const SavedRecruitersContext = createContext<SavedRecruitersContextType | undefined>(undefined);

export const useSavedRecruiters = () => {
  const context = useContext(SavedRecruitersContext);
  if (!context) {
    throw new Error('useSavedRecruiters must be used within a SavedRecruitersProvider');
  }
  return context;
};

interface SavedRecruitersProviderProps {
  children: ReactNode;
}

export const SavedRecruitersProvider: React.FC<SavedRecruitersProviderProps> = ({ children }) => {
  const [savedRecruiters, setSavedRecruiters] = useState<Recruiter[]>(() => {
    // Load saved recruiters from localStorage if available
    const saved = localStorage.getItem('savedRecruiters');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist savedRecruiters to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('savedRecruiters', JSON.stringify(savedRecruiters));
  }, [savedRecruiters]);

  const toggleSaved = (recruiter: Recruiter) => {
    setSavedRecruiters(prev => {
      const isAlreadySaved = prev.some(r => r.id === recruiter.id);
      
      if (isAlreadySaved) {
        return prev.filter(r => r.id !== recruiter.id);
      } else {
        return [...prev, recruiter];
      }
    });
  };

  return (
    <SavedRecruitersContext.Provider value={{ savedRecruiters, toggleSaved }}>
      {children}
    </SavedRecruitersContext.Provider>
  );
};