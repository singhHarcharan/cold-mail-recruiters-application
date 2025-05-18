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

export interface Recipient {
  id:number;
  name: string;
  email: string;
  company: string;
  jobProfile: string;
  toSend: boolean;
}
