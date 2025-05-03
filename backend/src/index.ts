import 'dotenv/config';
import { MailSender } from './mailSender';
import { Users, EmailContent } from './types';

function getBodydata(): Users {
  const names = ['Gurcharan Singh', 'Harcharanpreet Singh'];
  const emails = ['gurcharansinghkhalsa262@gmail.com', 'harcharansingh198400@gmail.com'];
  const companies = ['Accenture', 'Amdocs'];
  const jobProfiles = ['HR', 'Software Engineer'];
  return { names, emails, companies, jobProfiles };
}

async function main() {
  try {
    const mailSender = new MailSender();
    const recruiters: Users = getBodydata();
    const emailContent: EmailContent = {
      subject: 'Job Application from Harcharan Singh',
      text: 'Dear Recruiter,\n\nI am excited to apply for opportunities at your company. Please find my resume attached.\n\nBest regards,\nHarcharan Singh',
      html: '<p>Dear Recruiter,</p><p>I am excited to apply for opportunities at your company. Please find my resume attached.</p><p>Best regards,<br>Harcharan Singh</p>'
    };

    await mailSender.sendEmails(recruiters, emailContent);
    console.log('Emails sent successfully from index.ts');  
  } catch (error) {
    console.error('Failed to send emails:', error);
  }
}

main();