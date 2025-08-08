import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { initialSalesData } from '../data';

type SalesData = typeof initialSalesData[0];

interface AreaChartProps {
  data: SalesData[];
  dataKey: 'sales' | 'revenue';
  width: number;
  height: number;
}

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const getMonth = (d: SalesData) => d.name;
const getValue = (d: SalesData, key: 'sales' | 'revenue') => d[key];

const AreaChartComponent: React.FC<AreaChartProps> = ({ data, dataKey, width, height }) => {
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
        <AreaClosed
          data={data}
          x={d => xScale(getMonth(d)) ?? 0}
          y={d => yScale(getValue(d, dataKey)) ?? 0}
          yScale={yScale}
          strokeWidth={1}
          stroke={'#8884d8'}
          fill={'rgba(136, 132, 216, 0.3)'}
        />
        <AxisBottom top={yMax} scale={xScale} />
        <AxisLeft scale={yScale} />
      </Group>
    </svg>
  );
};

export default AreaChartComponent;
