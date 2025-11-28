"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailContent = void 0;
var EmailContent = /** @class */ (function () {
    function EmailContent() {
    }
    EmailContent.prototype.getEmailContent = function (fullName, companyName) {
        var emailContent = {
            // subject: 'Application for Software Engineer Role – Harcharanpreet Singh',
            subject: 'MERN Stack Developer – Mohali',
            text: "Hi ".concat(fullName, ",\n\nI hope you're doing well.\n\nI\u2019m Harcharanpreet Singh, a 2024 B.Tech graduate in Electronics & Communication Engineering, currently working as a Software Engineer at Amdocs (1+ years of experience). I have expertise in building Atlassian Jira Plugins and Full Stack applications using the MERN stack (React.js, Node.js, TypeScript, Express.js, MongoDB), and I have solved over 1,100 questions on LeetCode.\n\nI\u2019d love to connect if you're hiring and my experience aligns with your needs. I\u2019ve attached my resume for reference and would truly appreciate a referral for an SDE, Frontend, Backend, or Full Stack Developer role at <strong>").concat(companyName, "</strong> if possible.\n\nThank you for your time!\n\nBest regards,\nHarcharanpreet Singh\n\nResume Link: https://drive.google.com/file/d/1f-ZQ5pOHDC5H5lo78KEqV88eVjO9lnEX/view?usp=drive_link"),
            html: "\n        <p>Hi ".concat(fullName, ",</p>\n        <p>I hope you're doing well.</p>\n        <p>I\u2019m <strong>Harcharanpreet Singh</strong>, a <strong>2024 B.Tech graduate</strong> in Electronics & Communication Engineering, currently working as a <strong>Software Engineer at Amdocs</strong> (1+ years of experience).</p>\n        <p>I have expertise in building <strong>Atlassian Jira Plugins</strong> and Full Stack applications using the <strong>MERN stack</strong> (React.js, Node.js, TypeScript, Express.js, MongoDB), and I have solved over <strong>1,100 questions on LeetCode</strong>.</p>\n        <p>I\u2019d love to connect if you're hiring and my experience aligns with your needs. I\u2019ve attached my resume for reference and would truly appreciate a referral for an <strong>SDE, Frontend, Backend, or Full Stack Developer</strong> role at <strong>").concat(companyName, "</strong> if possible.</p>\n        <p>Thank you for your time!</p>\n        <p>Best regards,</p>\n        <p style=\"line-height: 1.5;\">\n          <strong>Harcharanpreet Singh</strong><br>\n        </p>\n      ")
        };
        return emailContent;
    };
    return EmailContent;
}());
exports.emailContent = new EmailContent();
