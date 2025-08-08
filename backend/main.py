#!/usr/bin/env python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

from typing import Optional
from pydantic import BaseModel

class AnalysisRequest(BaseModel):
    provider: str
    model: str

@app.get("/api/jobs")
def read_jobs(location: Optional[str] = None, technologies: Optional[str] = None):
    with open('jobs.json', 'r') as f:
        jobs = json.load(f)

    if location:
        jobs = [job for job in jobs if location.lower() in job['location'].lower()]

    if technologies:
        tech_list = [tech.strip().lower() for tech in technologies.split(',')]
        jobs = [
            job for job in jobs
            if any(tech.lower() in [t.lower() for t in job['technologies']] for tech in tech_list)
        ]

    return jobs

from collections import Counter

@app.get("/api/jobs/stats")
def get_job_stats():
    with open('jobs.json', 'r') as f:
        jobs = json.load(f)

    locations = [job['location'] for job in jobs]
    location_counts = Counter(locations)

    return {
        "total_jobs": len(jobs),
        "location_counts": location_counts
    }

@app.get("/api/jobs/stats/technologies")
def get_technology_stats(limit: Optional[int] = None):
    with open('jobs.json', 'r') as f:
        jobs = json.load(f)

    all_techs = [tech for job in jobs for tech in job['technologies']]
    tech_counts = Counter(all_techs)

    # Convert to list of dicts and sort
    sorted_techs = sorted(
        [{"technology": tech, "count": count} for tech, count in tech_counts.items()],
        key=lambda x: x['count'],
        reverse=True
    )

    if limit:
        return sorted_techs[:limit]

    return sorted_techs

@app.get("/api/llm/providers")
def get_llm_providers():
    with open('llm_providers.json', 'r') as f:
        providers = json.load(f)

    # Return only the name and models, not the sensitive data
    return [{"name": p["name"], "models": p["models"]} for p in providers]

@app.post("/api/jobs/{job_id}/analyze")
def analyze_job(job_id: int, request: AnalysisRequest):
    with open('jobs.json', 'r+') as f:
        jobs = json.load(f)
        job_to_update = None
        for job in jobs:
            if job['id'] == job_id:
                # Mock analysis
                job['analysis'] = {
                    "experience_level": "Senior",
                    "salary_range": "$120,000 - $150,000",
                    "summary": "This is a mock summary of the job description."
                }
                job_to_update = job
                break

        if job_to_update:
            # Move pointer to the beginning of the file to overwrite
            f.seek(0)
            json.dump(jobs, f, indent=2)
            f.truncate()
            return job_to_update
        else:
            # If job not found, you might want to return an error
            return {"error": "Job not found"}

@app.get("/")
def read_root():
    return {"Hello": "World"}
