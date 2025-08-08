import React, { useState } from 'react';

interface JobFilterProps {
  onFilterChange: (filters: { location: string, technologies: string }) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [location, setLocation] = useState('');
  const [technologies, setTechnologies] = useState('');

  const handleSearch = () => {
    onFilterChange({ location, technologies });
  };

  return (
    <div className="job-filter">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Filter by location"
      />
      <input
        type="text"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
        placeholder="Filter by technologies (comma-separated)"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default JobFilter;
