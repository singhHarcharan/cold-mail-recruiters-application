export interface EmailContent {
  subject: string;
  text?: string;
  html?: string;
}

export interface Users {
  names: string[];
  emails: string[];
  companies: string[];
  jobProfiles: string[];
}
