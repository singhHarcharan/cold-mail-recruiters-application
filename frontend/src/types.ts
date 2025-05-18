export interface Recruiter {
  id: string;
  name: string;
  email: string;
  company: string;
  location: string;
  role?: string;
  industries?: string[];
}

export interface FilterOptions {
  locations: string[];
  companies: string[];
}