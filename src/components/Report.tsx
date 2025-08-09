import React, { Suspense } from 'react';
import FilterPanel from './FilterPanel';
import CompanySizeChart from './CompanySizeChart';
import PieChartComponent from './PieChartComponent';
import { useData } from '../context/DataContext';

const MapComponent = React.lazy(() => import('./MapComponent'));

const Report: React.FC = () => {
  const { state } = useData();
  const { filteredJobs } = state;

  const experienceData = filteredJobs.reduce((acc, job) => {
    const level = job.experienceLevel;
    const existing = acc.find(item => item.name === level);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: level, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    fontFamily: 'sans-serif'
  };

  const filterPanelStyle: React.CSSProperties = {
    width: '250px',
    flexShrink: 0,
    overflowY: 'auto',
    padding: '1rem',
    borderRight: '1px solid #ccc'
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: '1rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto 1fr',
    gap: '1rem',
    overflow: 'auto',
  };

  const h1Style: React.CSSProperties = {
    gridColumn: '1 / -1',
    margin: 0,
  };

  const mapStyle: React.CSSProperties = {
    gridColumn: '1 / -1',
    minHeight: '400px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  };

  const chartWrapperStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div style={mainContainerStyle}>
      <div style={filterPanelStyle}>
        <FilterPanel />
      </div>
      <main style={contentStyle}>
        <h1 style={h1Style}>Job Analytics Dashboard</h1>
        <div style={mapStyle}>
          <Suspense fallback={<div>Loading Map...</div>}>
            <MapComponent />
          </Suspense>
        </div>
        <div style={chartWrapperStyle}>
          <h2>Jobs by Company Size</h2>
          <CompanySizeChart width={500} height={300} />
        </div>
        <div style={chartWrapperStyle}>
          <h2>Jobs by Experience Level</h2>
          <PieChartComponent data={experienceData} width={500} height={300} />
        </div>
      </main>
    </div>
  );
};

export default Report;
