<template>
  <div class="job-list">
    <ul>
      <li v-for="job in jobs" :key="job.id">
        <h2>{{ job.title }}</h2>
        <h3>{{ job.company }}</h3>
        <p>{{ job.location }}</p>
        <p>{{ job.description }}</p>
        <div>
          <strong>Technologies:</strong>
          <ul>
            <li v-for="tech in job.technologies" :key="tech">{{ tech }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
}

export default defineComponent({
  name: 'JobList',
  props: {
    location: {
      type: String as PropType<string>,
      default: ''
    },
    technologies: {
      type: String as PropType<string>,
      default: ''
    }
  },
  data() {
    return {
      jobs: [] as Job[]
    };
  },
  methods: {
    async fetchJobs() {
      try {
        let url = 'http://localhost:8000/api/jobs';
        const params = new URLSearchParams();
        if (this.location) {
          params.append('location', this.location);
        }
        if (this.technologies) {
          params.append('technologies', this.technologies);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        this.jobs = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    location() {
      this.fetchJobs();
    },
    technologies() {
      this.fetchJobs();
    }
  },
  mounted() {
    this.fetchJobs();
  }
});
</script>

<style scoped>
.job-list {
  max-width: 800px;
  margin: 0 auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
