import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 586,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },

    // ADD THIS LINE TO FIX THE ENETUNREACH ERROR
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    dnsLookup: (hostname, options, callback) => {
      require("dns").lookup(hostname, { family: 4 }, callback); // Force IPv4
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
