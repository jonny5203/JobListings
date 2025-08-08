import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs');
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
  }, []);

  if (error) {
    return <div class="error">{error}</div>;
  }

  return (
    <div class="job-list">
      <h1>Job Listings</h1>
      {jobs.length > 0 ? (
        jobs.map(job => <JobListing key={job.id} job={job} />)
      ) : (
        <p>Loading jobs...</p>
      )}
    </div>
  );
};

export default JobList;
