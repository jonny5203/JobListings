export interface Company {
  name: string;
  employeeCount: number;
  revenue: number; // in millions
}

export interface Job {
  id: number;
  title: string;
  companyName: string;
  description: string;
  experienceLevel: 'Entry' | 'Junior' | 'Senior';
  dataSource: 'LinkedIn' | 'Indeed' | 'Glassdoor';
  datePosted: string; // ISO 8601 format
  location: {
    city: string;
    lat: number;
    lng: number;
  };
}

export const companies: Company[] = [
  { name: 'TechCorp', employeeCount: 12000, revenue: 5000 },
  { name: 'Innovate LLC', employeeCount: 800, revenue: 150 },
  { name: 'DataSolutions', employeeCount: 2500, revenue: 400 },
  { name: 'WebWeavers', employeeCount: 50, revenue: 5 },
  { name: 'Quantum Inc.', employeeCount: 50000, revenue: 20000 },
  { name: 'TinyStartup', employeeCount: 10, revenue: 1 },
];

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    companyName: 'TechCorp',
    description: 'We are looking for a senior React developer with experience in TypeScript and modern frontend frameworks. Build and maintain our cutting-edge user interfaces.',
    experienceLevel: 'Senior',
    dataSource: 'LinkedIn',
    datePosted: '2024-07-10T10:00:00Z',
    location: { city: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 2,
    title: 'Entry Level Software Engineer',
    companyName: 'Innovate LLC',
    description: 'Join our dynamic team as an entry-level software engineer. You will work on various parts of our stack, including a robust NodeJS backend.',
    experienceLevel: 'Entry',
    dataSource: 'Indeed',
    datePosted: '2024-07-08T14:30:00Z',
    location: { city: 'New York', lat: 40.7128, lng: -74.0060 },
  },
  {
    id: 3,
    title: 'Junior Data Analyst',
    companyName: 'DataSolutions',
    description: 'Analyze large datasets to provide actionable insights. Experience with SQL and Python is a plus.',
    experienceLevel: 'Junior',
    dataSource: 'Glassdoor',
    datePosted: '2024-07-15T09:00:00Z',
    location: { city: 'Chicago', lat: 41.8781, lng: -87.6298 },
  },
  {
    id: 4,
    title: 'Full-Stack Developer',
    companyName: 'WebWeavers',
    description: 'A small but mighty team looking for a full-stack developer. We use React on the frontend and a Go backend.',
    experienceLevel: 'Junior',
    dataSource: 'LinkedIn',
    datePosted: '2024-06-28T11:00:00Z',
    location: { city: 'Austin', lat: 30.2672, lng: -97.7431 },
  },
  {
    id: 5,
    title: 'Senior Backend Engineer (Java)',
    companyName: 'Quantum Inc.',
    description: 'Quantum Inc. is seeking a seasoned backend engineer proficient in Java and Spring Boot to work on our enterprise-level systems.',
    experienceLevel: 'Senior',
    dataSource: 'Indeed',
    datePosted: '2024-07-18T16:00:00Z',
    location: { city: 'Seattle', lat: 47.6062, lng: -122.3321 },
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    companyName: 'TechCorp',
    description: 'Manage our CI/CD pipelines and cloud infrastructure on AWS. Experience with Kubernetes and Terraform is required.',
    experienceLevel: 'Senior',
    dataSource: 'Glassdoor',
    datePosted: '2024-07-20T12:00:00Z',
    location: { city: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 7,
    title: 'Entry Level UI/UX Designer',
    companyName: 'WebWeavers',
    description: 'Create beautiful and intuitive user experiences. A strong portfolio is a must. Knowledge of Figma is required.',
    experienceLevel: 'Entry',
    dataSource: 'LinkedIn',
    datePosted: '2024-07-01T08:00:00Z',
    location: { city: 'Austin', lat: 30.2672, lng: -97.7431 },
  },
  {
    id: 8,
    title: 'Junior React Native Developer',
    companyName: 'Innovate LLC',
    description: 'Work on our mobile application using React Native. Some experience with mobile development is preferred.',
    experienceLevel: 'Junior',
    dataSource: 'Indeed',
    datePosted: '2024-07-21T13:00:00Z',
    location: { city: 'New York', lat: 40.7128, lng: -74.0060 },
  },
];
