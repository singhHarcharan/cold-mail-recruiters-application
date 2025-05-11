import { Users, EmailContent } from "../types";
import { mailSender } from "../services/mailSender";
import { emailContent } from "../context/emailContent";

class Helper {

    getBodydata(): Users {
        const names = ['Armaan', 'Harcharanpreet Singh', 'Gurcharan Singh'];
        const emails = ['armaanaurapvt@gmail.com', 'harcharansingh198400@gmail.com', 'gurcharansinghkhalsa262@gmail.com'];
        const companies = ['Microsoft', 'Amdocs', 'Google'];
        const jobProfiles = ['HR', 'Engineer', 'Analyst'];
        return { names, emails, companies, jobProfiles };
    }

    async main(fullName: string, email: string, companyName: string) {
        try {
            const recruiters: Users = this.getBodydata();
            const contentToSend : EmailContent = emailContent.getEmailContent();

            // If we got the payload from frontend, send email to that person
            if (fullName && email && companyName) {
                await mailSender.sendOneEmail(email, fullName, companyName, contentToSend);
            } 
            // else send email to all recruiters
            else {
                await mailSender.sendEmails(recruiters, contentToSend);
            }
        } catch (error) {
            console.error('Failed to send emails:', error);
        }
    }
}
export const helper = new Helper();