<template>
  <div class="dashboard">
    <h2>Technology Distribution</h2>
    <BarChart :data="techStats" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarChart from './charts/BarChart.vue';

interface TechStat {
  technology: string;
  count: number;
}

export default defineComponent({
  name: 'Dashboard',
  components: {
    BarChart,
  },
  data() {
    return {
      techStats: [] as TechStat[],
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:8000/api/jobs/stats/technologies?limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch technology stats');
      }
      this.techStats = await response.json();
    } catch (error) {
      console.error(error);
    }
  },
});
</script>

<style scoped>
.dashboard {
  margin-top: 2rem;
}
</style>
