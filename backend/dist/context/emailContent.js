"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailContent = void 0;
class EmailContent {
    getEmailContent() {
        const emailContent = {
            subject: 'Application for Software Engineer Role – Harcharanpreet Singh',
            text: `Dear Recruiter,\n\nI hope you're doing well. I’m Harcharanpreet Singh, a Software Engineer at Amdocs, specializing in full-stack development, backend architecture, and Data Structures & Algorithms.\n\nKey Highlights:\n- Experience in building scalable applications using the MERN stack.\n- Developed efficient backend systems, improving system reliability by 20%.\n- Built a productivity app reducing operational costs by 15%.\n- Solved 1100+ coding challenges on Leetcode.\n- Key projects:\n  - PayPocket: Secure money transfer app.\n  - Movie Arena: Netflix-like website.\n  - Rain Vine: Weather tracking app.\n\nI’m keen to explore software engineering opportunities at your company and would love to be part of your hiring process.\n\nLooking forward to your response!\n\nBest regards,\nHarcharanpreet Singh\n📞 +91 62833 43351\n📧 harcharansingh198400@gmail.com\n🔗 LinkedIn: https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/\n🔗 GitHub: https://github.com/singhHarcharan/`,
            html: `
              <p>Dear Recruiter,</p>
              <p>I hope you're doing well. I’m <strong>Harcharanpreet Singh</strong>, a Software Engineer at <strong>Amdocs</strong>, specializing in full-stack development, backend architecture, and Data Structures & Algorithms.</p>
              <p><strong>Key Highlights:</strong></p>
              <ul>
                <li>Experience in building <strong>scalable applications</strong> using the MERN stack.</li>
                <li>Developed efficient backend systems, improving system reliability by <strong>20%</strong>.</li>
                <li>Built a productivity app reducing operational costs by <strong>15%</strong>.</li>
                <li>Solved <strong>1100+ coding challenges</strong> on Leetcode.</li>
                <li><strong>Key projects:</strong>
                  <ul>
                    <li><strong>PayPocket:</strong> Secure money transfer app.</li>
                    <li><strong>Movie Arena:</strong> Netflix-like website.</li>
                    <li><strong>Rain Vine:</strong> Weather tracking app.</li>
                  </ul>
                </li>
              </ul>
              <p>I’m keen to explore software engineering opportunities at <strong>your company</strong> and would love to be part of your hiring process.</p>
              <p>Looking forward to your response!</p>
              <p>Best regards,</p>
              <p><strong>Harcharanpreet Singh</strong><br>
                📞 <strong>+91 62833 43351</strong><br>
                📧 <a href="mailto:harcharansingh198400@gmail.com">harcharansingh198400@gmail.com</a><br>
                🔗 <a href="https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/">LinkedIn</a><br>
                🔗 <a href="https://github.com/singhHarcharan/">GitHub</a>
              </p>
            `
        };
        return emailContent;
    }
}
exports.emailContent = new EmailContent();
