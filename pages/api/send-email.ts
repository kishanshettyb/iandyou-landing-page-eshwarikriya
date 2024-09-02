import { EmailTemplate } from '@/components/email-templates';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: 'kishankishb@gmail.com',
    to: ['kishanshetty1992@gmail.com'],
    subject: 'Hello world',
    react: EmailTemplate({ firstName: 'Kishan' })
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
