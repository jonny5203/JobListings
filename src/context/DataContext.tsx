import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { jobs as allJobs, companies as allCompanies, Job, Company } from '../data';

// Define the shape of our state
export interface Filters {
  keyword: string;
  companies: string[];
  experienceLevels: ('Entry' | 'Junior' | 'Senior')[];
}

export interface AppState {
  allJobs: Job[];
  allCompanies: Company[];
  filters: Filters;
  filteredJobs: Job[];
}

// Define the actions
export type Action =
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'SET_COMPANIES'; payload: string[] }
  | { type: 'SET_EXPERIENCE_LEVELS'; payload: ('Entry' | 'Junior' | 'Senior')[] };

// Initial state
const initialState: AppState = {
  allJobs,
  allCompanies,
  filters: {
    keyword: '',
    companies: [],
    experienceLevels: [],
  },
  filteredJobs: allJobs, // Initially, show all jobs
};

// Reducer function to handle state changes
const dataReducer = (state: AppState, action: Action): AppState => {
  let newFilters: Filters;
  switch (action.type) {
    case 'SET_KEYWORD':
      newFilters = { ...state.filters, keyword: action.payload };
      break;
    case 'SET_COMPANIES':
      newFilters = { ...state.filters, companies: action.payload };
      break;
    case 'SET_EXPERIENCE_LEVELS':
        newFilters = { ...state.filters, experienceLevels: action.payload };
        break;
    default:
      return state;
  }

  // Apply all filters
  const newFilteredJobs = state.allJobs.filter(job => {
    const keywordMatch = !newFilters.keyword || job.title.toLowerCase().includes(newFilters.keyword.toLowerCase()) || job.description.toLowerCase().includes(newFilters.keyword.toLowerCase());
    const companyMatch = newFilters.companies.length === 0 || newFilters.companies.includes(job.companyName);
    const experienceMatch = newFilters.experienceLevels.length === 0 || newFilters.experienceLevels.includes(job.experienceLevel);

    return keywordMatch && companyMatch && experienceMatch;
  });

  return { ...state, filters: newFilters, filteredJobs: newFilteredJobs };
};


// Create the context
interface DataContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

// Create the provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
