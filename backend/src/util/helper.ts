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
            const contentToSend : EmailContent = emailContent.getEmailContent(fullName, companyName);

            // If we got the payload from frontend, send email to that person
            if (fullName && email && companyName) {
                const response = await mailSender.sendOneEmail(email, fullName, companyName, contentToSend);
                return response;
            } 
            // else send email to all recruiters
            else {
                // const response = await mailSender.sendEmails(recruiters, contentToSend);
                // return response;

                throw new Error('No payload received');
                return {success: false, message: 'No payload received'};
            }
        } catch (error) {
            console.error('Failed to send emails:', error);
            return {success: false, message: 'Failed to send emails'};
        }
    }
}
export const helper = new Helper();