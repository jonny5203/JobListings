<template>
  <div class="job-stats">
    <h3>Jobs by Location</h3>
    <ul>
      <li v-for="(count, location) in stats.location_counts" :key="location">
        {{ location }}: {{ count }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface LocationCounts {
  [key: string]: number;
}

interface Stats {
  location_counts: LocationCounts;
}

export default defineComponent({
  name: 'JobStats',
  data() {
    return {
      stats: { location_counts: {} } as Stats
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:8000/api/jobs/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      this.stats = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
});
</script>

<style scoped>
.job-stats {
  margin-top: 2rem;
  border: 1px solid #ccc;
  padding: 1rem;
}
</style>
