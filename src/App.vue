<template>
  <main>
    <h1>Job Listings</h1>
    <JobFilter @filter-change="updateFilters" />
    <JobList :location="filters.location" :technologies="filters.technologies" />
    <JobStats />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JobList from './components/JobList.vue';
import JobFilter from './components/JobFilter.vue';
import JobStats from './components/JobStats.vue';

export default defineComponent({
  name: 'App',
  components: {
    JobList,
    JobFilter,
    JobStats
  },
  data() {
    return {
      filters: {
        location: '',
        technologies: ''
      }
    };
  },
  methods: {
    updateFilters(newFilters: { location:string, technologies: string }) {
      this.filters = newFilters;
    }
  }
});
</script>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>