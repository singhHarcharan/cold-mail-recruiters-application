"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailContent = void 0;
class EmailContent {
    getEmailContent() {
        const emailContent = {
            subject: 'Software Engineer Role Application – Harcharanpreet Singh',
            text: `Dear Bani Grover,\n\nI hope you’re well. I’m Harcharanpreet Singh, a Software Engineer at Amdocs. I applied for the Software Engineer role and wanted to check on my application status.\n\nKey Highlights:\n- Strong expertise in Data Structures & Algorithms (1100+ LeetCode problems solved, 450+ day streak).\n- Hands-on experience with the MERN stack, building scalable full-stack applications.\n- Proficient in a wide tech stack including C++, Java, JavaScript, React.js, Node.js, and AWS, enabling versatile full-stack development.\n\nI’d love to know if I’m a good fit or what the next steps are. Attaching my updated resume for your reference.\n\nThank you for your time!\n\nWith regards,\nHarcharanpreet Singh\nHarcharanpreet Singh\n+91 62833 43351\nharcharansingh198400@gmail.com\nResume Link: https://drive.google.com/file/d/1bdEfJazCMJjjpseUP7G0jaYj1UAXr0S1/view?usp=drive_link\nLinkedIn: https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/\nGitHub: https://github.com/singhHarcharan/`,
            html: `
            <p>Dear Bani Grover,</p>
            <p>I hope you’re well. I’m <strong>Harcharanpreet Singh</strong>, a Software Engineer at <strong>Amdocs</strong>. I applied for the <strong>Software Engineer</strong> role and wanted to check on my application status.</p>
            <p><strong>Key Highlights:</strong></p>
            <ul>
              <li>Strong expertise in <strong>Data Structures & Algorithms</strong> (1100+ LeetCode problems solved, 450+ day streak).</li>
              <li>Hands-on experience with the <strong>MERN stack</strong>, building scalable full-stack applications.</li>
              <li>Proficient in a wide tech stack including <strong>C++, Java, JavaScript, React.js, Node.js, and AWS</strong>, enabling versatile full-stack development.</li>
            </ul>
            <p>I’d love to know if I’m a good fit or what the next steps are. Attaching my updated resume for your reference.</p>
            <p>Thank you for your time!</p>
            <p>With regards,</p>
            <p style="line-height: 1.5;">
              <strong>Harcharanpreet Singh</strong><br>
              <strong>Harcharanpreet Singh</strong><br>
              <strong>+91 62833 43351</strong><br>
              <a href="mailto:harcharansingh198400@gmail.com">harcharansingh198400@gmail.com</a><br>
              Resume Link: <a href="https://drive.google.com/file/d/1f-ZQ5pOHDC5H5lo78KEqV88eVjO9lnEX/view?usp=drive_link">https://drive.google.com/file/d/1f-ZQ5pOHDC5H5lo78KEqV88eVjO9lnEX/view?usp=drive_link</a><br>
              LinkedIn: <a href="https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/">https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/</a><br>
              GitHub: <a href="https://github.com/singhHarcharan/">https://github.com/singhHarcharan/</a>
            </p>
          `
        };
        return emailContent;
    }
}
exports.emailContent = new EmailContent();
