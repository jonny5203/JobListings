import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LocationData {
  [key: string]: number;
}

interface PieChartProps {
  data: LocationData;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const svg = d3.select(ref.current);
      svg.selectAll('*').remove(); // Clear previous chart

      const width = 450;
      const height = 450;
      const margin = 40;

      const radius = Math.min(width, height) / 2 - margin;

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(d3.schemeSet2);

      const pie = d3.pie<[string, number]>()
        .value(d => d[1]);

      const data_ready = pie(Object.entries(data));

      const arcGenerator = d3.arc<d3.PieArcDatum<[string, number]>>()
        .innerRadius(0)
        .outerRadius(radius);

      // Tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

      g.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d: any) => color(d.data[0]))
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .on('mouseover', (event, d) => {
            tooltip.style('opacity', 1);
        })
        .on('mousemove', (event, d) => {
            tooltip
                .html(`Location: ${d.data[0]}<br>Jobs: ${d.data[1]}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseleave', (event, d) => {
            tooltip.style('opacity', 0);
        });

      g.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text((d: any) => d.data[0])
        .attr('transform', (d: any) => `translate(${arcGenerator.centroid(d)})`)
        .style('text-anchor', 'middle')
        .style('font-size', 15);
    }
  }, [data]);

  return (
    <svg
      ref={ref}
      width={450}
      height={450}
    />
  );
};

export default PieChart;
