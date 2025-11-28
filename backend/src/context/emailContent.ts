class EmailContent {
  getEmailContent(fullName: string, companyName: string) {
    const emailContent = {
      subject: 'Potential fit for your engineering team',
      text: `Dear ${fullName},\n\nI'm Harcharanpreet Singh, a Software Engineer at Amdocs (1.5+ YOE) with experience in backend systems, full-stack development, and AI-driven automation. I've built production-ready features, including an internal RAG-based AI system at Amdocs and a complete Jira plugin as a <strong>Founding Engineer</strong>.\n\nI'm keen to be part of an engineering team like ${companyName} and contribute to building reliable, well-designed systems. I've attached my resume for your reference and would be glad to connect if you're hiring or open to a conversation.\n\nBest regards,\nHarcharanpreet Singh\n+91-6283343351\nharcharansingh198400@gmail.com\nLinkedIn: https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/`,

      html: `
        <p>Dear ${fullName},</p>
        <p>I'm <strong>Harcharanpreet Singh</strong>, a <strong>Software Engineer at Amdocs (1.5+ YOE)</strong> with experience in backend systems, full-stack development, and AI-driven automation. I've built production-ready features, including an internal RAG-based AI system at Amdocs and a complete Jira plugin as a <strong>Founding Engineer</strong>.</p>
        <p>I'm keen to be part of an engineering team like <strong>${companyName}</strong> and contribute to building reliable, well-designed systems. I've attached my resume for your reference and would be glad to connect if you're hiring or open to a conversation.</p>
        <p>Best regards,</p>
        <p style="line-height: 1.5;">
          <strong>Harcharanpreet Singh</strong><br>
          +91-6283343351<br>
          harcharansingh198400@gmail.com<br>
          <a href="https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/">linkedin.com/in/harcharanpreet-singh</a><br>
        </p>
      `
    };
    return emailContent;
  }
}

export const emailContent = new EmailContent();