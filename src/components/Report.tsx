import React, { useState } from 'react';
import { Group } from '@visx/group';
import { Bar, Pie } from '@visx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { salesData, categoryData } from '../data';

// Define types for data
type SalesData = typeof salesData[0];
type CategoryData = typeof categoryData[0];

// Accessors
const getMonth = (d: SalesData) => d.name;
const getSalesValue = (d: SalesData, key: 'sales' | 'revenue') => d[key];
const getCategoryName = (d: CategoryData) => d.name;
const getCategoryValue = (d: CategoryData) => d.value;

// Dimensions
const chartWidth = 600;
const chartHeight = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const xMax = chartWidth - margin.left - margin.right;
const yMax = chartHeight - margin.top - margin.bottom;

const Report: React.FC = () => {
  const [dataKey, setDataKey] = useState<'sales' | 'revenue'>('sales');

  // Bar Chart Scales
  const xScale = scaleBand<string>({
    domain: salesData.map(getMonth),
    range: [0, xMax],
    padding: 0.4,
  });
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...salesData.map(d => getSalesValue(d, dataKey)))],
    range: [yMax, 0],
  });

  // Pie Chart Scales
  const pieSize = 300;
  const radius = pieSize / 2;
  const colorScale = scaleOrdinal<string, string>({
    domain: categoryData.map(getCategoryName),
    range: ['rgba(23, 233, 217, .5)', 'rgba(74, 187, 255, .5)', 'rgba(255, 206, 86, .5)', 'rgba(255, 99, 132, .5)'],
  });

  return (
    <div>
      <h2>Sales Report (visx)</h2>
      <div>
        <button onClick={() => setDataKey('sales')}>Show Sales</button>
        <button onClick={() => setDataKey('revenue')}>Show Revenue</button>
      </div>
      <svg width={chartWidth} height={chartHeight}>
        <Group left={margin.left} top={margin.top}>
          {salesData.map(d => {
            const month = getMonth(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getSalesValue(d, dataKey)) ?? 0);
            const barX = xScale(month);
            const barY = yMax - barHeight;
            return (
              <Bar
                key={`bar-${month}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="rgba(23, 233, 217, .5)"
              />
            );
          })}
          <AxisBottom top={yMax} scale={xScale} />
          <AxisLeft scale={yScale} />
        </Group>
      </svg>

      <h2>Category Distribution (visx)</h2>
      <svg width={pieSize} height={pieSize}>
        <Group top={radius} left={radius}>
          <Pie
            data={categoryData}
            pieValue={getCategoryValue}
            outerRadius={radius}
          >
            {pie => (
              pie.arcs.map((arc, index) => {
                return (
                  <g key={`arc-${index}`}>
                    <path d={pie.path(arc) || ''} fill={colorScale(getCategoryName(arc.data))} />
                  </g>
                );
              })
            )}
          </Pie>
        </Group>
      </svg>
    </div>
  );
};

export default Report;
