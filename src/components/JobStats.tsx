import React, { useState, useEffect } from 'react';

interface LocationCounts {
  [key: string]: number;
}

interface Stats {
  total_jobs: number;
  location_counts: LocationCounts;
}

const JobStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="job-stats">
      <h3>Job Statistics</h3>
      <p>Total Jobs: {stats.total_jobs}</p>
      <h4>Jobs by Location:</h4>
      <ul>
        {Object.entries(stats.location_counts).map(([location, count]) => (
          <li key={location}>
            {location}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobStats;
