import { Users, EmailContent } from "../types";
import { MailSender } from "../services/mailSender";

class Helper {

    getBodydata(): Users {
        const names = ['Armaan', 'Harcharanpreet Singh', 'Gurcharan Singh'];
        const emails = ['armaanaurapvt@gmail.com', 'harcharansingh198400@gmail.com', 'gurcharansinghkhalsa262@gmail.com'];
        const companies = ['Microsoft', 'Amdocs', 'Google'];
        const jobProfiles = ['HR', 'Engineer', 'Analyst'];
        return { names, emails, companies, jobProfiles };
    }

    async main() {
        try {
            const mailSender = new MailSender();
            const recruiters: Users = this.getBodydata();
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
}
export const helper = new Helper();