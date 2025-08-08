import json
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from the backend!"}

@app.get("/api/jobs")
def get_jobs(location: Optional[str] = None, technology: Optional[str] = None):
    with open("/app/backend/jobs.json", "r") as f:
        jobs = json.load(f)

    if location:
        jobs = [job for job in jobs if location.lower() in job['location'].lower()]

    if technology:
        jobs = [
            job for job in jobs
            if any(tech.lower() == technology.lower() for tech in job['technologies'])
        ]

    return jobs
