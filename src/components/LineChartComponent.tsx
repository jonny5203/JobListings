import React from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { initialSalesData } from '../data';

type SalesData = typeof initialSalesData[0];

interface LineChartProps {
  data: SalesData[];
  dataKey: 'sales' | 'revenue';
  width: number;
  height: number;
}

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const getMonth = (d: SalesData) => d.name;
const getValue = (d: SalesData, key: 'sales' | 'revenue') => d[key];

const LineChartComponent: React.FC<LineChartProps> = ({ data, dataKey, width, height }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleBand<string>({
    domain: data.map(getMonth),
    range: [0, xMax],
    padding: 0.5,
  });
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map(d => getValue(d, dataKey)))],
    range: [yMax, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={data}
          x={d => xScale(getMonth(d)) ?? 0}
          y={d => yScale(getValue(d, dataKey)) ?? 0}
          stroke="#8884d8"
          strokeWidth={2}
        />
        <AxisBottom top={yMax} scale={xScale} />
        <AxisLeft scale={yScale} />
      </Group>
    </svg>
  );
};

export default LineChartComponent;
