<template>
  <div v-if="analysis" class="job-analysis">
    <h4>LLM Analysis:</h4>
    <ul>
      <li v-for="(value, key) in analysis" :key="key">
        <strong>{{ key.replace(/_/g, ' ') }}:</strong> {{ value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Analysis {
  [key: string]: any;
}

export default defineComponent({
  name: 'JobAnalysis',
  props: {
    analysis: {
      type: Object as PropType<Analysis | null>,
      default: null,
    },
  },
});
</script>

<style scoped>
.job-analysis {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px dashed #ccc;
  text-align: left;
}
.job-analysis h4 {
  margin-top: 0;
}
</style>
