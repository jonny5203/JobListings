import React, { useState, useEffect } from 'react';
import JobAnalysis from './JobAnalysis';

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

interface JobListProps {
  location: string;
  technologies: string;
}

const JobList: React.FC<JobListProps> = ({ location, technologies }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [llmProviders, setLlmProviders] = useState<LLMProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<{ [key: number]: string }>({});
  const [selectedModel, setSelectedModel] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = 'http://localhost:8000/api/jobs';
        const params = new URLSearchParams();
        if (location) {
          params.append('location', location);
        }
        if (technologies) {
          params.append('technologies', technologies);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, [location, technologies]);

  useEffect(() => {
    const fetchLlmProviders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/llm/providers');
        if (!response.ok) {
          throw new Error('Failed to fetch LLM providers');
        }
        const data = await response.json();
        setLlmProviders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLlmProviders();
  }, []);

  const handleAnalyzeJob = async (jobId: number) => {
    const provider = selectedProvider[jobId];
    const model = selectedModel[jobId];
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
      setJobs(jobs.map(j => j.id === jobId ? updatedJob : j));
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderModels = (providerName: string): string[] => {
    const provider = llmProviders.find(p => p.name === providerName);
    return provider ? provider.models : [];
  };

  return (
    <div className="job-list">
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <h3>{job.company}</h3>
            <p>{job.location}</p>
            <p>{job.description}</p>
            <div>
              <strong>Technologies:</strong>
              <ul>
                {job.technologies.map(tech => <li key={tech}>{tech}</li>)}
              </ul>
            </div>

            <JobAnalysis analysis={job.analysis} />

            <div className="analysis-section">
              <select onChange={(e) => setSelectedProvider({ ...selectedProvider, [job.id]: e.target.value })}>
                <option value="">Select Provider</option>
                {llmProviders.map(provider => (
                  <option key={provider.name} value={provider.name}>
                    {provider.name}
                  </option>
                ))}
              </select>
              {selectedProvider[job.id] && (
                <select onChange={(e) => setSelectedModel({ ...selectedModel, [job.id]: e.target.value })}>
                  <option value="">Select Model</option>
                  {getProviderModels(selectedProvider[job.id]).map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              )}
              <button onClick={() => handleAnalyzeJob(job.id)} disabled={!selectedProvider[job.id] || !selectedModel[job.id]}>
                Analyze
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
