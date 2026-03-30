import dotenv from 'dotenv';

dotenv.config();

export const verificationEmailTemplate = (firstName, vToken) => {
  const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${vToken}`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #4f46e5;">Welcome to Healthly, ${firstName}!</h2>
      <p style="color: #475569; line-height: 1.6;">
        We're excited to have you on board. To start managing your child's health and booking appointments with our pediatricians, please verify your email address.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      <p style="color: #94a3b8; font-size: 12px;">
        If the button doesn't work, copy and paste this link: <br>
        ${verifyLink}
      </p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
      <p style="color: #94a3b8; font-size: 12px;">This link will expire in 24 hours.</p>
    </div>
  `;
};