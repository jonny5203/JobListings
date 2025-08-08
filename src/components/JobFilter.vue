<template>
  <div class="job-filter">
    <input type="text" v-model="location" @input="emitFilterChange" placeholder="Filter by location" />
    <input type="text" v-model="technologies" @input="emitFilterChange" placeholder="Filter by technologies (comma-separated)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JobFilter',
  data() {
    return {
      location: '',
      technologies: ''
    };
  },
  methods: {
    emitFilterChange() {
      this.$emit('filter-change', {
        location: this.location,
        technologies: this.technologies
      });
    }
  }
});
</script>

<style scoped>
.job-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
input {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
