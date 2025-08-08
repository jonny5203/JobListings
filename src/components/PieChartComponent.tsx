import React from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import { initialCategoryData } from '../data';

type CategoryData = typeof initialCategoryData[0];

interface PieChartProps {
  data: CategoryData[];
  width: number;
  height: number;
}

const getCategoryName = (d: CategoryData) => d.name;
const getCategoryValue = (d: CategoryData) => d.value;

const PieChartComponent: React.FC<PieChartProps> = ({ data, width, height }) => {
  const radius = Math.min(width, height) / 2;
  const colorScale = scaleOrdinal<string, string>({
    domain: data.map(getCategoryName),
    range: ['rgba(23, 233, 217, .5)', 'rgba(74, 187, 255, .5)', 'rgba(255, 206, 86, .5)', 'rgba(255, 99, 132, .5)'],
  });

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        <Pie
          data={data}
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
  );
};

export default PieChartComponent;
