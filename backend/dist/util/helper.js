"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
const mailSender_1 = require("../services/mailSender");
class Helper {
    getBodydata() {
        const names = ['Armaan', 'Harcharanpreet Singh', 'Gurcharan Singh'];
        const emails = ['armaanaurapvt@gmail.com', 'harcharansingh198400@gmail.com', 'gurcharansinghkhalsa262@gmail.com'];
        const companies = ['Microsoft', 'Amdocs', 'Google'];
        const jobProfiles = ['HR', 'Engineer', 'Analyst'];
        return { names, emails, companies, jobProfiles };
    }
    main(fullName, email, companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailSender = new mailSender_1.MailSender();
                const recruiters = this.getBodydata();
                const emailContent = {
                    subject: 'Job Application for Software Engineer Role',
                    text: 'Dear Recruiter,\n\nI am excited to apply for opportunities at your company. Please find my resume attached.\n\nBest regards,\nHarcharan Singh',
                    html: '<p>Dear Recruiter,</p><p>I am excited to apply for opportunities at your company. Please find my resume attached.</p><p>Best regards,<br>Harcharan Singh</p>'
                };
                // If we got the payload from frontend, send email to that person
                if (fullName && email && companyName) {
                    yield mailSender.sendOneEmail(email, fullName, companyName, emailContent);
                }
                // else send email to all recruiters
                else {
                    yield mailSender.sendEmails(recruiters, emailContent);
                }
            }
            catch (error) {
                console.error('Failed to send emails:', error);
            }
        });
    }
}
exports.helper = new Helper();
