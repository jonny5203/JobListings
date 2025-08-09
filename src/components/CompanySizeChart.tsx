import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useData } from '../context/DataContext';
import { getCompanySize, CompanySize } from '../utils/companyUtils';

interface ChartData {
  category: CompanySize;
  count: number;
}

const CompanySizeChart: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const { state } = useData();
  const { filteredJobs, allCompanies } = state;

  const companySizeData = filteredJobs.reduce((acc, job) => {
    const company = allCompanies.find(c => c.name === job.companyName);
    if (company) {
      const size = getCompanySize(company);
      if (!acc[size]) {
        acc[size] = 0;
      }
      acc[size]++;
    }
    return acc;
  }, {} as Record<CompanySize, number>);

  const chartData: ChartData[] = Object.entries(companySizeData).map(([category, count]) => ({
    category: category as CompanySize,
    count,
  }));

  const yDomain = chartData.map(d => d.category);
  const xMax = width - 100;

  const yScale = scaleBand<string>({
    domain: yDomain,
    range: [0, height - 50],
    padding: 0.2,
  });

  const xScale = scaleLinear<number>({
    domain: [0, Math.max(0, ...chartData.map(d => d.count))],
    range: [0, xMax],
  });

  const colorScale = scaleOrdinal<string, string>({
      domain: yDomain,
      range: ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'],
  });

  return (
    <svg width={width} height={height}>
      <Group top={20} left={80}>
        {chartData.map(d => {
            const y = yScale(d.category);
            if (y === undefined) return null;
            return (
                <Bar
                    key={d.category}
                    y={y}
                    x={0}
                    width={xScale(d.count)}
                    height={yScale.bandwidth()}
                    fill={colorScale(d.category)}
                />
            )
        })}
        <AxisLeft scale={yScale} />
      </Group>
    </svg>
  );
};

export default CompanySizeChart;
