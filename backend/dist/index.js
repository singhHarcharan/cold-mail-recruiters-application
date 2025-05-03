"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mailSender_1 = require("./mailSender");
// Re-implement getBodydata if needed, or import it
function getBodydata() {
    const names = ['Gurcharan Singh', 'Harcharanpreet Singh'];
    const emails = ['gurcharansinghkhalsa262@gmail.com', 'harcharansingh198400@gmail.com'];
    const companies = ['Accenture', 'Amdocs'];
    const jobProfiles = ['HR', 'Software Engineer'];
    return { names, emails, companies, jobProfiles };
}
const mailSender = new mailSender_1.MailSender();
const recruiters = getBodydata();
const emailContent = {
    subject: 'Job Application from Harcharan Singh',
    text: 'Dear Recruiter,\n\nI am excited to apply for opportunities at your company. Please find my resume attached.\n\nBest regards,\nHarcharan Singh',
    html: '<p>Dear Recruiter,</p><p>I am excited to apply for opportunities at your company. Please find my resume attached.</p><p>Best regards,<br>Harcharan Singh</p>'
};
mailSender.sendEmails(recruiters, emailContent).then(() => {
    console.log('Emails sent from index.ts');
});
