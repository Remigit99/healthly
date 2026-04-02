import {Resend} from "resend";
// import { verificationEmailTemplate } from "./emailTemplate";

// Initialize with your Render Env Var
const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email,html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Healthly <onboarding@resend.dev>', // Resend provides this for testing
      to: email,
      subject: 'Verify your Healthly Account',
      html: html,
      // html: `
      //   <h1>Welcome to Healthly!</h1>
      //   <p>Please verify your email by clicking the link below:</p>
      //   <a href="https://healthlyapp.netlify.app/verify-email?token=${token}">
      //     Verify Email
      //   </a>
      // `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Critical Email Failure:", err);
    return { success: false, err };
  }
};

module.exports = sendVerificationEmail;