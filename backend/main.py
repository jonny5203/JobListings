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

    return {"location_counts": location_counts}

@app.get("/")
def read_root():
    return {"Hello": "World"}
