import React, { useState, useEffect } from 'react';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';

interface TechStat {
  technology: string;
  count: number;
}

interface LocationCounts {
  [key: string]: number;
}

const Dashboard: React.FC = () => {
  const [techStats, setTechStats] = useState<TechStat[]>([]);
  const [locationCounts, setLocationCounts] = useState<LocationCounts>({});

  useEffect(() => {
    const fetchTechStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs/stats/technologies?limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch technology stats');
        }
        const data = await response.json();
        setTechStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchJobStats = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/jobs/stats');
            if (!response.ok) {
                throw new Error('Failed to fetch job stats');
            }
            const data = await response.json();
            setLocationCounts(data.location_counts);
        } catch (error) {
            console.error(error);
        }
    };

    fetchTechStats();
    fetchJobStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Technology Distribution</h2>
      <BarChart data={techStats} />
      <h2>Job Distribution by Location</h2>
      <PieChart data={locationCounts} />
    </div>
  );
};

export default Dashboard;
