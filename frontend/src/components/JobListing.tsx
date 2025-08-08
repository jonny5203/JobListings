import React from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  posted_season: string;
}

interface JobListingProps {
  job: Job;
}

const JobListing: React.FC<JobListingProps> = ({ job }) => {
  return (
    <div class="job-listing">
      <h2>{job.title}</h2>
      <h3>{job.company} - {job.location}</h3>
      <p>{job.description}</p>
      <div>
        <strong>Technologies:</strong> {job.technologies.join(', ')}
      </div>
      <div>
        <strong>Posted Season:</strong> {job.posted_season}
      </div>
    </div>
  );
};

export default JobListing;
