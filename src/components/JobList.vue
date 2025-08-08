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

        <JobAnalysis :analysis="job.analysis" />

        <div class="analysis-section">
          <select v-model="selectedProvider[job.id]">
            <option disabled value="">Select Provider</option>
            <option v-for="provider in llmProviders" :key="provider.name" :value="provider.name">
              {{ provider.name }}
            </option>
          </select>
          <select v-if="selectedProvider[job.id]" v-model="selectedModel[job.id]">
            <option disabled value="">Select Model</option>
            <option v-for="model in providerModels(selectedProvider[job.id])" :key="model" :value="model">
              {{ model }}
            </option>
          </select>
          <button @click="analyzeJob(job.id)" :disabled="!selectedProvider[job.id] || !selectedModel[job.id]">
            Analyze
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import JobAnalysis from './JobAnalysis.vue';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  analysis: object | null;
}

interface LLMProvider {
  name: string;
  models: string[];
}

export default defineComponent({
  name: 'JobList',
  components: {
    JobAnalysis
  },
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
      jobs: [] as Job[],
      llmProviders: [] as LLMProvider[],
      selectedProvider: {} as { [key: number]: string },
      selectedModel: {} as { [key: number]: string }
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
    },
    async fetchLlmProviders() {
      try {
        const response = await fetch('http://localhost:8000/api/llm/providers');
        if (!response.ok) {
          throw new Error('Failed to fetch LLM providers');
        }
        this.llmProviders = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async analyzeJob(jobId: number) {
      const provider = this.selectedProvider[jobId];
      const model = this.selectedModel[jobId];
      if (!provider || !model) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ provider, model }),
        });
        if (!response.ok) {
          throw new Error('Failed to analyze job');
        }
        const updatedJob = await response.json();
        // Update the job in the list
        const index = this.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
          this.jobs[index] = updatedJob;
        }
      } catch (error) {
        console.error(error);
      }
    },
    providerModels(providerName: string): string[] {
      const provider = this.llmProviders.find(p => p.name === providerName);
      return provider ? provider.models : [];
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
    this.fetchLlmProviders();
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
  text-align: left;
}
.analysis-section {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
