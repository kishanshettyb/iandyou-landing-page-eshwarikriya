// pages/api/razorpay-order.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string, // Type assertion
  key_secret: process.env.RAZORPAY_KEY_SECRET as string
});

interface RazorpayOrderRequest extends NextApiRequest {
  body: {
    amount: number;
    currency?: string;
    receipt?: string;
  };
}

export default async function handler(req: RazorpayOrderRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency || 'INR',
      receipt: receipt || 'receipt_order_74394'
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
