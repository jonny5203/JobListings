<template>
  <div ref="chart" class="bar-chart"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, PropType } from 'vue';
import * as d3 from 'd3';

interface TechData {
  technology: string;
  count: number;
}

export default defineComponent({
  name: 'BarChart',
  props: {
    data: {
      type: Array as PropType<TechData[]>,
      required: true,
    },
  },
  setup(props) {
    const chart = ref<HTMLDivElement | null>(null);

    const drawChart = () => {
      if (!chart.value || !props.data || props.data.length === 0) {
        return;
      }

      // Clear previous chart
      d3.select(chart.value).selectAll('*').remove();

      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select(chart.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .range([0, width])
        .domain(props.data.map(d => d.technology))
        .padding(0.2);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      const y = d3.scaleLinear()
        .domain([0, d3.max(props.data, d => d.count) || 0])
        .range([height, 0]);

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.selectAll('mybar')
        .data(props.data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.technology) || 0)
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', '#69b3a2');
    };

    onMounted(() => {
      drawChart();
    });

    watch(() => props.data, () => {
      drawChart();
    }, { deep: true });

    return {
      chart,
    };
  },
});
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style>
