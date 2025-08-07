# Job Listing Data Platform

This project is a data platform for collecting, analyzing, and visualizing job listings from various data sources.

## Project Structure

- `backend/`: Python (FastAPI) application
- `frontend/`: React (Vite) application (Note: currently at the root of the repo)

## Getting Started

### Backend

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the development server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```
    The backend will be available at `http://localhost:8000`.

### Frontend

1.  **Navigate to the project root directory.**

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.
