import 'dotenv/config';
import { MailSender } from './mailSender';
import { Users, EmailContent } from './types';

function getBodydata(): Users {
  const names = ['Armaan'];
  const emails = ['armaanaurapvt@gmail.com'];
  const companies = ['Microsoft'];
  const jobProfiles = ['HR'];
  return { names, emails, companies, jobProfiles };
}

async function main() {
  try {
    const mailSender = new MailSender();
    const recruiters: Users = getBodydata();
    const emailContent: EmailContent = {
      subject: 'Job Application for Software Engineer Role',
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