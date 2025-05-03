import nodemailer from 'nodemailer';

// Create the transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'armaanaurapersonal@gmail.com',       // Your Gmail address
    pass: 'xyfxgjohbqwwjbha'           // App password (NOT your real password)
  }
});

// Define the email options
const mailOptions = {
  from: '"Armaan 👨‍💻" <armaanaurapersonal@gmail.com>',
  to: 'armaanaurapvt@gmail.com',
  subject: 'Hello from TypeScript',
  text: 'This email was sent using TypeScript and Nodemailer!',
  html: '<p>This email was sent using <b>TypeScript</b> and <i>Nodemailer</i>!</p>'
};

// Send the email
async function sendEmail() {

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();
