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
const emailContent_1 = require("../context/emailContent");
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
                const recruiters = this.getBodydata();
                const contentToSend = emailContent_1.emailContent.getEmailContent(fullName, companyName);
                // If we got the payload from frontend, send email to that person
                if (fullName && email && companyName) {
                    const response = yield mailSender_1.mailSender.sendOneEmail(email, fullName, companyName, contentToSend);
                    return response;
                }
                // else send email to all recruiters
                else {
                    // const response = await mailSender.sendEmails(recruiters, contentToSend);
                    // return response;
                    throw new Error('No payload received');
                    return { success: false, message: 'No payload received' };
                }
            }
            catch (error) {
                console.error('Failed to send emails:', error);
                return { success: false, message: 'Failed to send emails' };
            }
        });
    }
}
exports.helper = new Helper();
