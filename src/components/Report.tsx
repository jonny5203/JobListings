import React, { useState, useEffect } from 'react';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import LineChartComponent from './LineChartComponent';
import AreaChartComponent from './AreaChartComponent';
import { initialSalesData, initialCategoryData, getNewCategoryData } from '../data';

const Report: React.FC = () => {
  const [dataKey, setDataKey] = useState<'sales' | 'revenue'>('sales');
  const [barChartType, setBarChartType] = useState<'standard' | 'stacked'>('standard');
  const [salesData, setSalesData] = useState(initialSalesData);
  const [categoryData, setCategoryData] = useState(initialCategoryData);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate both charts for a more "live" feel
      setCategoryData(getNewCategoryData());
      setSalesData(prev => prev.map(d => ({...d, sales: d.sales * (0.95 + Math.random() * 0.1) })))
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    padding: '1rem',
  };

  const chartWrapperStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div>
      <h1>Interactive Dashboard</h1>
      <div style={chartContainerStyle}>
        <div style={chartWrapperStyle}>
          <h2>Sales Report</h2>
          <div>
            <button onClick={() => setDataKey('sales')}>Show Sales</button>
            <button onClick={() => setDataKey('revenue')}>Show Revenue</button>
            <button onClick={() => setBarChartType(t => t === 'standard' ? 'stacked' : 'standard')}>
              {barChartType === 'standard' ? 'Show Stacked' : 'Show Standard'}
            </button>
          </div>
          <BarChartComponent data={salesData} dataKey={dataKey} chartType={barChartType} width={500} height={300} />
        </div>

        <div style={chartWrapperStyle}>
          <h2>Category Distribution (Live)</h2>
          <PieChartComponent data={categoryData} width={500} height={300} />
        </div>

        <div style={chartWrapperStyle}>
          <h2>Sales Trend</h2>
          <LineChartComponent data={salesData} dataKey="sales" width={500} height={300} />
        </div>

        <div style={chartWrapperStyle}>
          <h2>Revenue Trend</h2>
          <AreaChartComponent data={salesData} dataKey="revenue" width={500} height={300} />
        </div>
      </div>
    </div>
  );
};

export default Report;
