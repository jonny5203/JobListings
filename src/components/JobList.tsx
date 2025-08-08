import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import JobFilter from './JobFilter';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  posted_season: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ location: '', technology: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      const query = new URLSearchParams(filters).toString();
      try {
        const response = await fetch(`http://localhost:8000/api/jobs?${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        setError('Failed to fetch jobs. Is the backend server running?');
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (newFilters: { location: string; technology: string }) => {
    setFilters(newFilters);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="job-list">
      <h1>Job Listings</h1>
      <JobFilter onFilterChange={handleFilterChange} />
      {jobs.length > 0 ? (
        jobs.map(job => <JobListing key={job.id} job={job} />)
      ) : (
        <p>No jobs found matching your criteria.</p>
      )}
    </div>
  );
};

export default JobList;
