'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

type Props = {};

function ThankYou({}: Props) {
  const searchParams = useSearchParams();
  const paymentid = searchParams.get('paymentid');
  const orderId = searchParams.get('orderid');
  const signature = searchParams.get('signature');
  return <div>ThankYou:{paymentid + orderId + signature}</div>;
}

export default ThankYou;
