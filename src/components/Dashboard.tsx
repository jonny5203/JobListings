import React, { useState, useEffect } from 'react';
import BarChart from './charts/BarChart';

interface TechStat {
  technology: string;
  count: number;
}

const Dashboard: React.FC = () => {
  const [techStats, setTechStats] = useState<TechStat[]>([]);

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

    fetchTechStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Technology Distribution</h2>
      <BarChart data={techStats} />
    </div>
  );
};

export default Dashboard;
