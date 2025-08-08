import React from 'react';
import { Group } from '@visx/group';
import { Bar, BarStack } from '@visx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { initialSalesData } from '../data';

type SalesData = typeof initialSalesData[0];
const keys = ['sales', 'revenue', 'profit'];

interface BarChartProps {
  data: SalesData[];
  dataKey: 'sales' | 'revenue';
  chartType: 'standard' | 'stacked';
  width: number;
  height: number;
}

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const getMonth = (d: SalesData) => d.name;
const getValue = (d: SalesData, key: 'sales' | 'revenue') => d[key];

const BarChartComponent: React.FC<BarChartProps> = ({ data, dataKey, chartType, width, height }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleBand<string>({
    domain: data.map(getMonth),
    range: [0, xMax],
    padding: 0.2,
  });

  const yScaleStandard = scaleLinear<number>({
    domain: [0, Math.max(...data.map(d => getValue(d, dataKey)))],
    range: [yMax, 0],
  });

  const yScaleStacked = scaleLinear<number>({
    domain: [Math.min(...data.map(d => d.profit)), Math.max(...data.map(d => d.sales + d.revenue))],
    range: [yMax, 0],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: ['#a8e6cf', '#dcedc1', '#ffd3b6'],
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {chartType === 'standard' ? (
          <>
            {data.map(d => {
              const month = getMonth(d);
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - (yScaleStandard(getValue(d, dataKey)) ?? 0);
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
            <AxisLeft scale={yScaleStandard} />
          </>
        ) : (
          <>
            <BarStack
              data={data}
              keys={keys}
              x={getMonth}
              xScale={xScale}
              yScale={yScaleStacked}
              color={colorScale}
            >
              {barStacks =>
                barStacks.map(barStack =>
                  barStack.bars.map(bar => (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      fill={bar.color}
                    />
                  ))
                )
              }
            </BarStack>
            <AxisLeft scale={yScaleStacked} />
          </>
        )}
        <AxisBottom top={yMax} scale={xScale} />
      </Group>
    </svg>
  );
};

export default BarChartComponent;
