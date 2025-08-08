import React, { useState } from 'react';

interface JobFilterProps {
  onFilterChange: (filters: { location: string; technology: string }) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [location, setLocation] = useState('');
  const [technology, setTechnology] = useState('');

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ location, technology });
  };

  return (
    <form onSubmit={handleFilter} className="job-filter">
      <input
        type="text"
        placeholder="Filter by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by technology..."
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default JobFilter;
