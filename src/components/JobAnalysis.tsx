import React from 'react';

interface Analysis {
  [key: string]: any;
}

interface JobAnalysisProps {
  analysis: Analysis | null;
}

const JobAnalysis: React.FC<JobAnalysisProps> = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  return (
    <div className="job-analysis">
      <h4>LLM Analysis:</h4>
      <ul>
        {Object.entries(analysis).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace(/_/g, ' ')}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobAnalysis;
