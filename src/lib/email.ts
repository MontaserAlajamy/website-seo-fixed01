import nodemailer from 'nodemailer';
import { z } from 'zod';

const emailSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'job.automationtest@gmail.com',
    pass: 'uqja arkf lvkb tjnf',
  },
});

export async function sendEmail(data: z.infer<typeof emailSchema>) {
  try {
    const validatedData = emailSchema.parse(data);

    await transporter.sendMail({
      from: 'job.automationtest@gmail.com',
      to: 'mu.elagami.com',
      subject: `New Contact Form Submission from ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Message: ${validatedData.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Message:</strong> ${validatedData.message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
