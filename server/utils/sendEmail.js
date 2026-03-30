import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS, 
    },
  });

  const mailOptions = {
    from: '"Healthly Team" <noreply@healthly.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  //  Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;





// Implementation for sending verification email
// export const sendVerificationEmail = async (user) => {
// Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: "Gmail",
//   port: 587,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
// };