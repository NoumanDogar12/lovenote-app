"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResponseNotification({
  senderEmail,
  recipientName,
  senderName,
  valentineId,
}: {
  senderEmail: string;
  recipientName: string;
  senderName: string;
  valentineId: string;
}) {
  try {
    await resend.emails.send({
      from: "LoveNote <noreply@lovenote.app>",
      to: senderEmail,
      subject: `${recipientName || "Your Valentine"} said YES! 💕`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">💕</div>
          <h1 style="color: #E11D48; font-size: 28px; margin-bottom: 8px;">
            They said YES!
          </h1>
          <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            <strong>${recipientName || "Your Valentine"}</strong> opened your Valentine
            and said <strong style="color: #E11D48;">YES</strong>!
          </p>
          <p style="color: #9CA3AF; font-size: 14px; margin-bottom: 32px;">
            From ${senderName || "you"}, with love.
          </p>
          <a href="${process.env.NEXT_PUBLIC_URL}/dashboard"
             style="display: inline-block; background: #E11D48; color: white; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
            View on Dashboard
          </a>
          <p style="color: #D1D5DB; font-size: 12px; margin-top: 32px;">
            LoveNote - Ask your Valentine in style
          </p>
        </div>
      `,
    });
  } catch (error) {
    // Log but don't block the response
    console.error("Failed to send notification email:", error);
  }
}

export async function sendPublishedNotification({
  senderEmail,
  recipientName,
  shareLink,
}: {
  senderEmail: string;
  recipientName: string;
  shareLink: string;
}) {
  try {
    await resend.emails.send({
      from: "LoveNote <noreply@lovenote.app>",
      to: senderEmail,
      subject: `Your Valentine for ${recipientName || "your special someone"} is live! 💌`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">💌</div>
          <h1 style="color: #E11D48; font-size: 28px; margin-bottom: 8px;">
            Your Valentine is published!
          </h1>
          <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Share this link with <strong>${recipientName || "your special someone"}</strong>:
          </p>
          <a href="${shareLink}"
             style="display: inline-block; background: #FFF1F2; color: #E11D48; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px; word-break: break-all;">
            ${shareLink}
          </a>
          <p style="color: #9CA3AF; font-size: 13px; margin-top: 24px;">
            This link will be active for 30 days.
          </p>
          <p style="color: #D1D5DB; font-size: 12px; margin-top: 32px;">
            LoveNote - Ask your Valentine in style
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send published notification:", error);
  }
}
