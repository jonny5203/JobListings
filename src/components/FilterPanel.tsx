import React from 'react';
import { useData, Action } from '../context/DataContext';
import { Job } from '../data';

const FilterPanel: React.FC = () => {
  const { state, dispatch } = useData();
  const { filters, allCompanies } = state;

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_KEYWORD', payload: e.target.value });
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentLevels = filters.experienceLevels;
    const newLevels = checked
      ? [...currentLevels, value as Job['experienceLevel']]
      : currentLevels.filter(level => level !== value);
    dispatch({ type: 'SET_EXPERIENCE_LEVELS', payload: newLevels });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentCompanies = filters.companies;
    const newCompanies = checked
      ? [...currentCompanies, value]
      : currentCompanies.filter(company => company !== value);
    dispatch({ type: 'SET_COMPANIES', payload: newCompanies });
  };

  const experienceLevels: Job['experienceLevel'][] = ['Entry', 'Junior', 'Senior'];

  const panelStyle: React.CSSProperties = {
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      height: '100%'
  };

  const sectionStyle: React.CSSProperties = {
      marginBottom: '1.5rem'
  };

  return (
    <div style={panelStyle}>
      <h3>Filters</h3>

      <div style={sectionStyle}>
        <label htmlFor="keyword-search" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Keyword</label>
        <input
          type="text"
          id="keyword-search"
          placeholder="Search titles & descriptions..."
          value={filters.keyword}
          onChange={handleKeywordChange}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={sectionStyle}>
        <h4 style={{ marginBottom: '0.5rem' }}>Experience Level</h4>
        {experienceLevels.map(level => (
          <div key={level}>
            <input
              type="checkbox"
              id={`exp-${level}`}
              value={level}
              checked={filters.experienceLevels.includes(level)}
              onChange={handleExperienceChange}
            />
            <label htmlFor={`exp-${level}`} style={{ marginLeft: '0.5rem' }}>{level}</label>
          </div>
        ))}
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Company</h4>
        {allCompanies.map(company => (
          <div key={company.name}>
            <input
              type="checkbox"
              id={`comp-${company.name}`}
              value={company.name}
              checked={filters.companies.includes(company.name)}
              onChange={handleCompanyChange}
            />
            <label htmlFor={`comp-${company.name}`} style={{ marginLeft: '0.5rem' }}>{company.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
