import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TechData {
  technology: string;
  count: number;
}

interface BarChartProps {
  data: TechData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const svg = d3.select(ref.current);
      svg.selectAll('*').remove(); // Clear previous chart

      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.technology))
        .padding(0.2);

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) || 0])
        .range([height, 0]);

      g.append('g')
        .call(d3.axisLeft(y));

      g.selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.technology) || 0)
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', '#69b3a2');
    }
  }, [data]);

  return (
    <svg
      ref={ref}
      width={460}
      height={400}
    />
  );
};

export default BarChart;
